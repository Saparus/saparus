import { v4 as uuid } from "uuid"
import { PutCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"

export const createChildrenProgram = async (event) => {
  const { title, description, images } = JSON.parse(event.body)

  // Validate input
  if (!title || !description) {
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
            const imageBuffer = Buffer.from(image.data, "base64")
            const imageKey = `children-programs/${uuid()}.jpg`
            await uploadImage(process.env.BUCKET_NAME, imageKey, imageBuffer)
            return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`
          })
        )
      : []

    const params = {
      TableName: process.env.CHILDREN_PROGRAMS_TABLE,
      Item: {
        id: uuid(),
        title: title,
        description: description,
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
      body: JSON.stringify({ message: "Children program created successfully" }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error creating children program", error }),
    }
  }
}
