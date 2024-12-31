import { v4 as uuidv4 } from "uuid"
import { UpdateCommand, ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"

export const editAllAboutItems = async (event) => {
  const { aboutItems } = JSON.parse(event.body)

  const scanParams = {
    TableName: process.env.ABOUT_TABLE,
  }

  try {
    // Scan the table to get all existing items
    const existingItems = await db.send(new ScanCommand(scanParams))

    // Delete all existing items
    const deletePromises = existingItems.Items.map((item) => {
      const deleteParams = {
        TableName: process.env.ABOUT_TABLE,
        Key: { id: item.id },
      }
      return db.send(new DeleteCommand(deleteParams))
    })
    await Promise.all(deletePromises)

    // Insert new items
    const insertPromises = aboutItems.map(async (item) => {
      const itemId = uuidv4()
      let imageUrl = item.imageUrl // default to existing image URL

      // if there's a new image, upload it to S3
      if (item?.image && item.image?.data && item.image?.name) {
        const buffer = Buffer.from(item.image.data, "base64") // decode base64 image
        const imageKey = `about-items/${itemId}/${item.image.name}`
        await uploadImage(process.env.BUCKET_NAME, imageKey, buffer)
        imageUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`
      }

      const params = {
        TableName: process.env.ABOUT_TABLE,
        Item: {
          id: itemId,
          title: item.title,
          text: item.text,
          image: imageUrl,
        },
      }
      return db.send(new UpdateCommand(params))
    })
    await Promise.all(insertPromises)

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
