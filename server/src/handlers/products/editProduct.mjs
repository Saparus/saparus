import { UpdateCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"
import { updateGlobalCategories } from "../../util/updateGlobalCategories.mjs"

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

  if (!name || !id) {
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
    let imageURL

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

    const usedLanguages = Object.keys(categories)

    if (!usedLanguages.includes("en")) categories.en = {}
    if (!usedLanguages.includes("ka")) categories.ka = {}
    if (!usedLanguages.includes("ru")) categories.ru = {}

    Object.keys(categories).forEach((language) => {
      Object.entries(categories[language]).forEach(([key, languageSpecificCategory]) => {
        if (language === "en") return

        if (!languageSpecificCategory.name) {
          categories[language][key] = {}
          categories[language][key][Object.keys(languageSpecificCategory)[0]] = {}
          categories[language][key][Object.keys(languageSpecificCategory)[0]].name =
            categories.en[key][key].name
        }
      })

      if (!categories[language].company) return

      Object.keys(categories[language].company).forEach((languageSpecificCompany) => {
        delete categories[language].company[languageSpecificCompany].image

        if (!imageURL) return

        categories[language].company[languageSpecificCompany].imageURL = imageURL
      })
    })

    if (!name.ka) name.ka = name.en
    if (!name.ru) name.ru = name.en

    if (!description.ka) description.ka = name.en
    if (!description.ru) description.ru = name.en

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

    updateGlobalCategories(categories, imageURL)

    return {
      statusCode: 201,
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
