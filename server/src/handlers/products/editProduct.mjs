import { UpdateCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"

export const editProduct = async (event) => {
  const { id } = event.pathParameters

  const body = JSON.parse(event.body)

  const name = body.name
  const fixedPrice = body.fixedPrice ? true : false
  const price = body.price !== undefined ? Number(body.price) : 0
  const description = body.description
  const categories = body.categories || {}
  const inStock = body.inStock !== undefined ? Boolean(body.inStock) : false
  const images = body.images || []

  if (!name || !description || !id) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  try {
    const imageUrls = images?.length
      ? await Promise.all(
          images.map(async (image) => {
            if (image.startsWith("http://") || image.startsWith("https://")) {
              return image.replace(/(\/s|\/m|\/o)\.webp$/, "")
            } else {
              return uploadImage(image, "product")
            }
          })
        )
      : []

    let imageURL = ""

    if (categories?.en?.company?.company?.image && categories?.en?.company?.company?.name) {
      const image = categories.en.company.company.image

      if (image) {
        imageURL = await uploadImage(
          image,
          "company_images",
          undefined,
          categories.en.company.company.name
        )
      }
    }

    Object.entries(categories).forEach(([language, languageCategories]) => {
      Object.entries(languageCategories).forEach(([categoryKey, categoryValue]) => {
        Object.entries(categoryValue).forEach(([languageSpecificCategory, value]) => {
          if (categoryKey === "company") {
            value.imageURL = imageURL
            delete value.image

            categories[language][categoryKey][languageSpecificCategory] = value
          }
        })
      })
    })

    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Key: { id },
      UpdateExpression:
        "set #name = :name, fixedPrice = :fixedPrice, description = :description, price = :price, categories = :categories, inStock = :inStock, images = :images",
      ExpressionAttributeNames: {
        "#name": "name", // because name is a reserved keyword in DynamoDB
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":fixedPrice": fixedPrice,
        ":description": description,
        ":price": price,
        ":categories": categories,
        ":inStock": inStock,
        ":images": imageUrls,
      },
      ReturnValues: "UPDATED_NEW",
    }

    const updateCommand = new UpdateCommand(params)
    const result = await db.send(updateCommand)

    // Fetch global categories
    const categoryParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: {
        id: "categories",
      },
    }

    const { Item } = await db.send(new GetCommand(categoryParams))
    const globalCategories = Item?.categories || {}

    Object.entries(categories).forEach(([language, languageCategories]) => {
      if (!globalCategories[language]) {
        globalCategories[language] = {}
      }

      Object.entries(languageCategories).forEach(([categoryKey, categoryValue]) => {
        if (!globalCategories[language][categoryKey]) {
          globalCategories[language][categoryKey] = {}
        }

        Object.entries(categoryValue).forEach(([languageSpecificCategory, value]) => {
          if (!globalCategories[language][categoryKey][languageSpecificCategory]) {
            globalCategories[language][categoryKey][languageSpecificCategory] = []
          }

          const exists = globalCategories[language][categoryKey][languageSpecificCategory].some(
            (existingItem) => existingItem.name === value.name
          )

          if (!exists && value) {
            globalCategories[language][categoryKey][languageSpecificCategory].push(value)

            if (categoryKey === "company" && imageURL) {
              delete value.image
              value.imageURL = imageURL
            }
          }
        })
      })
    })

    // Store updated global categories
    const putParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Item: {
        id: "categories",
        categories: globalCategories,
      },
    }

    await db.send(new PutCommand(putParams, { removeUndefinedValues: true }))

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(result.Attributes),
    }
  } catch (error) {
    console.error("Error updating product", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Internal server error", error }),
    }
  }
}
