import { v4 as uuid } from "uuid"
import { PutItemCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"

export const createNewsItem = async (event) => {
  const { title, text, images } = JSON.parse(event.body)

  // Validate input
  if (!title || !text || !images || !Array.isArray(images)) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Missing required fields or images is not an array" }),
    }
  }

  try {
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const imageBuffer = Buffer.from(image.data, "base64")
        const imageKey = `news/${uuid()}.jpg`
        await uploadImage(process.env.BUCKET_NAME, imageKey, imageBuffer)
        return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`
      })
    )

    const params = {
      TableName: process.env.NEWS_TABLE,
      Item: {
        id: uuid(),
        title: title,
        text: text,
        date: Date.now(),
        imageUrls: imageUrls,
      },
    }

    const putItemCommand = new PutItemCommand(params)
    await db.send(putItemCommand)

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "News item created successfully" }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error creating news item", error }),
    }
  }
}
