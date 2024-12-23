import { v4 as uuid } from "uuid"
import { uploadImage } from "../../util/s3.mjs"
import { PutCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const createProduct = async (event) => {
  const {
    name,
    fixedPrice = true,
    price,
    description,
    categories,
    inStock = false,
    images = [],
  } = JSON.parse(event.body)

  // Validate input
  if (!name || !price || !description) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
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
      Item: {
        id: uuid(),
        name: name,
        description: description,
        price: price,
        categories: categories,
        fixedPrice: fixedPrice,
        inStock: inStock,
        imageUrls: imageUrls,
      },
    }

    const putCommand = new PutCommand(params)
    await db.send(putCommand)
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Product created successfully" }),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Internal server error" }),
    }
  }
}
