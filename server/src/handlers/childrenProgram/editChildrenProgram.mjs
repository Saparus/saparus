import { v4 as uuid } from "uuid"
import { UpdateCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"

export const editChildrenProgram = async (event) => {
  const { id } = event.pathParameters
  const { title, text, images } = JSON.parse(event.body)

  // Validate input
  if (!id || !title || !text) {
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
      TableName: process.env.CHILDREN_PROGRAMS_TABLE,
      Key: { id },
      UpdateExpression: "set title = :title, description = :description, images = :images",
      ExpressionAttributeValues: {
        ":title": title,
        ":text": text,
        ":images": imageUrls,
      },
      ReturnValues: "UPDATED_NEW",
    }

    const updateCommand = new UpdateCommand(params)
    const result = await db.send(updateCommand)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(result.Attributes),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error updating children program", error }),
    }
  }
}
