import { v4 as uuid } from "uuid"
import { PutCommand } from "@aws-sdk/lib-dynamodb"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

import { db } from "../../util/db.mjs"

const s3 = new S3Client({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const uploadImage = async (bucketName, key, body) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: "image/jpeg",
    ACL: "public-read",
  }

  const putObjectCommand = new PutObjectCommand(params)

  try {
    const data = await s3.send(putObjectCommand)
    return data
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

export const createNewsItem = async (event) => {
  const { title, text, images } = JSON.parse(event.body)

  // Validate input
  if (!title || !text) {
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
    const imageUrls = images
      ? await Promise.all(
          images?.map(async (image) => {
            const base64Data = image.split(",")[1] // removing the prefix
            const imageBuffer = Buffer.from(base64Data, "base64")
            const imageKey = `news/${uuid()}.jpg`
            await uploadImage(process.env.BUCKET_NAME, imageKey, imageBuffer)

            return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`
          })
        )
      : []

    const params = {
      TableName: process.env.NEWS_TABLE,
      Item: {
        id: uuid(),
        title: title,
        text: text,
        date: Date.now(),
        images: imageUrls,
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
      body: JSON.stringify({
        message: "News item created successfully",
        article: { ...params.Item, images: imageUrls },
      }),
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
