import { v4 as uuid } from "uuid"
import { BatchWriteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"

export const editAllAboutItems = async (event) => {
  const { aboutItems } = JSON.parse(event.body)

  try {
    // Prepare delete requests for all existing items
    const existingItems = await db.send(new ScanCommand({ TableName: process.env.ABOUT_TABLE }))

    const deleteRequests = existingItems.Items.map((item) => ({
      DeleteRequest: {
        Key: { id: item.id },
      },
    }))

    // Prepare put requests for new items
    const putRequests = await Promise.all(
      aboutItems.map(async (item) => {
        const itemId = uuid()
        const image = item.image
        let imageUrl = null

        if (image.startsWith("http://") || image.startsWith("https://")) {
          imageUrl = image.replace(/(\/s|\/m|\/o)\.webp$/, "")
        } else {
          imageUrl = await uploadImage(image, "about")
        }

        if (!item.title.ka && item.title.en) item.title.ka = item.title.en
        if (!item.title.ru && item.title.en) item.title.ru = item.title.en

        if (!item.text.ka && item.text.en) item.text.ka = item.text.en
        if (!item.text.ru && item.text.en) item.text.ru = item.text.en

        return {
          PutRequest: {
            Item: {
              id: itemId,
              title: item.title,
              text: item.text,
              position: item.position,
              image: imageUrl,
            },
          },
        }
      })
    )

    // Combine delete and put requests
    const writeRequests = [...deleteRequests, ...putRequests]
    while (writeRequests.length) {
      const batch = writeRequests.splice(0, 10) // BatchWrite limit
      await db.send(
        new BatchWriteCommand({
          RequestItems: {
            [process.env.ABOUT_TABLE]: batch,
          },
        })
      )
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "About items updated successfully" }),
    }
  } catch (error) {
    console.error("Error updating about items", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error updating about items", error }),
    }
  }
}
