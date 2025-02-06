import { UpdateCommand } from "@aws-sdk/lib-dynamodb"

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
  const categories = body.categories || []
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
    let imageURL

    const companyCategory = categories.find((category) => category && category.image)

    if (companyCategory) {
      imageURL = await uploadImage(
        companyCategory.image,
        "company_images",
        undefined,
        companyCategory.value.en
      )

      console.log("Company image URL:", imageURL)
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

    categories.forEach((category) => {
      if (category) {
        const { name, value } = category

        if (!name.ka) name.ka = name.en
        if (!name.ru) name.ru = name.en

        if (!value.ka) value.ka = value.en
        if (!value.ru) value.ru = value.en
      }
    })

    if (!name.ka) name.ka = name.en
    if (!name.ru) name.ru = name.en

    if (!description.ka && description.en) description.ka = name.en
    if (!description.ru && description.en) description.ru = name.en

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
        ":categories": categories.map((category) => {
          if (category && category.key === "company") {
            delete category.image
          }
          return category
        }),
        ":inStock": inStock,
        ":images": imageUrls,
      },
      ReturnValues: "UPDATED_NEW",
    }

    const updateCommand = new UpdateCommand(params)
    const result = await db.send(updateCommand)

    await updateGlobalCategories(categories, imageURL)

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
