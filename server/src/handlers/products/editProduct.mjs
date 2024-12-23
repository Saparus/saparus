import { v4 as uuid } from "uuid"
import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"
import { UpdateCommand } from "@aws-sdk/lib-dynamodb"

export const editProduct = async (event) => {
  const { id } = event.pathParameters
  const { name, fixedPrice, price, description, categories, inStock, images } = JSON.parse(
    event.body
  )

  // Validate input
  if (
    !id ||
    !name | !description ||
    !fixedPrice ||
    !categories ||
    !inStock ||
    !price ||
    !images ||
    !Array.isArray(images)
  ) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,PATCH",
      },
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  fixedPrice = Number(fixedPrice)
  price = Number(price)
  inStock = Boolean(inStock)

  try {
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const imageBuffer = Buffer.from(image.data, "base64")
        const imageKey = `products/${uuid()}.jpg`
        await uploadImage(process.env.BUCKET_NAME, imageKey, imageBuffer)
        return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`
      })
    )

    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Key: { id },
      UpdateExpression:
        "set name = :name, fixedPrice = :fixedPrice, description = :description, price = :price, categories = :categories, inStock = :inStock, imageUrls = :imageUrls",
      ExpressionAttributeValues: {
        ":name": name,
        ":fixedPrice": fixedPrice,
        ":description": description,
        ":price": price,
        ":categories": categories,
        ":inStock": inStock,
        ":imageUrls": imageUrls,
      },
      ReturnValues: "UPDATED_NEW",
    }

    const updateCommand = new UpdateCommand(params)
    const result = await db.send(updateCommand)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,PATCH",
      },
      body: JSON.stringify(result.Attributes),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTION,PATCH",
      },
      body: JSON.stringify({ message: "Internal server error" }),
    }
  }
}
