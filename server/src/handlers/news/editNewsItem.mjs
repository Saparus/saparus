import { v4 as uuid } from "uuid"
import { UpdateCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"

export const editNewsItem = async (event) => {
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
    const imageUrls = images?.length
      ? await Promise.all(
          images.map(async (image) => {
            if (image.startsWith("http://") || image.startsWith("https://")) {
              return image.replace(/(\/s|\/m|\/o)\.webp$/, "")
            } else {
              return uploadImage(image, "news")
            }
          })
        )
      : []

    if (!title.ka) title.ka = title.en
    if (!title.ru) title.ru = title.en

    if (!text.ka) text.ka = text.en
    if (!text.ru) text.ru = text.en

    const params = {
      TableName: process.env.NEWS_TABLE,
      Key: { id },
      UpdateExpression: "set title = :title, #text = :text, images = :images",
      ExpressionAttributeNames: {
        "#text": "text", // because text is a reserved keyword in DynamoDB
      },
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
      body: JSON.stringify({ message: "Error updating news item", error }),
    }
  }
}
