import { v4 as uuid } from "uuid"
import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"
import { UpdateCommand } from "@aws-sdk/lib-dynamodb"

export const editChildrenProgram = async (event) => {
  const { id } = event.pathParameters
  const { title, description, images } = JSON.parse(event.body)

  // Validate input
  if (!title || !description || !images || !Array.isArray(images)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields or images is not an array" }),
    }
  }

  try {
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const imageBuffer = Buffer.from(image.data, "base64")
        const imageKey = `children-programs/${uuid()}.jpg`
        await uploadImage(process.env.BUCKET_NAME, imageKey, imageBuffer)
        return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`
      })
    )

    const params = {
      TableName: process.env.CHILDREN_PROGRAMS_TABLE,
      Key: { id },
      UpdateExpression: "set title = :title, description = :description, imageUrls = :imageUrls",
      ExpressionAttributeValues: {
        ":title": title,
        ":description": description,
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