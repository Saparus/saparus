import { v4 as uuidv4 } from "uuid"
import AWS from "aws-sdk"

import { db } from "../../util/db.mjs"

const s3 = new AWS.S3()

export const editAllAboutItems = async (event) => {
  const { aboutItems } = JSON.parse(event.body)

  const scanParams = {
    TableName: process.env.ABOUT_TABLE,
  }

  try {
    // Scan the table to get all existing items
    const existingItems = await db.scan(scanParams).promise()

    // Delete all existing items
    const deletePromises = existingItems.Items.map((item) => {
      const deleteParams = {
        TableName: tableName,
        Key: { id: item.id },
      }
      return db.delete(deleteParams).promise()
    })
    await Promise.all(deletePromises)

    // Insert new items
    const insertPromises = aboutItems.map(async (item) => {
      const itemId = uuidv4()
      let imageUrl = item.imageUrl // default to existing image URL

      // if there's a new image, upload it to S3
      if (item.image && item.image.data && item.image.name) {
        const buffer = Buffer.from(item.image.data, "base64") // decode base64 image

        const s3Params = {
          Bucket: process.env.BUCKET_NAME,
          Key: `about-items/${itemId}/${item.image.name}`,
          Body: buffer,
          ContentType: item.image.type,
          ACL: "public-read",
        }

        const s3UploadResult = await s3.upload(s3Params).promise()
        imageUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${s3UploadResult.Key}`
      }

      const params = {
        TableName: tableName,
        Item: {
          id: itemId,
          title: item.title,
          text: item.text,
          imageUrl: imageUrl,
        },
      }
      return db.put(params).promise()
    })
    await Promise.all(insertPromises)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "All About items updated successfully" }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
}
