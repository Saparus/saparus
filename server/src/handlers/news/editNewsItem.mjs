import { v4 as uuid } from "uuid"
import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"
import { UpdateCommand } from "@aws-sdk/lib-dynamodb"

export const editNewsItem = async (event) => {
  const { id } = event.pathParameters
  const { title, text, images } = JSON.parse(event.body)

  // Validate input
  if (!title || !text || !images || !Array.isArray(images)) {
    return {
      statusCode: 400,
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
      Key: { id },
      UpdateExpression: "set title = :title, text = :text, imageUrls = :imageUrls",
      ExpressionAttributeValues: {
        ":title": title,
        ":text": text,
        ":imageUrls": imageUrls,
      },
      ReturnValues: "UPDATED_NEW",
    }

    const updateCommand = new UpdateCommand(params)
    const result = await db.send(updateCommand)
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    }
  }
}
