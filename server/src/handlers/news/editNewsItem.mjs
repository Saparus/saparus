import { v4 as uuid } from "uuid"
import AWS from "aws-sdk"
import { db } from "../../util/db.mjs"

const s3 = new AWS.S3()

export const editNewsItem = async (event) => {
  try {
    const { id } = event.pathParameters
    const { title, text, images } = JSON.parse(event.body)

    const uploadedImages = await Promise.all(
      images.map(async (image, index) => {
        const imageBuffer = Buffer.from(image, "base64")
        const key = `news-items/${uuid()}-${index}`

        const uploadParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: key,
          Body: imageBuffer,
          ContentType: "image/jpeg", // we will think about webp later
          ACL: "public-read", // make the object publicly readable
        }

        await s3.upload(uploadParams).promise()

        return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`
      })
    )

    const params = {
      TableName: process.env.NEWS_TABLE,
      Key: { id },
      UpdateExpression: "set title = :title, text = :text, images = :images",
      ExpressionAttributeValues: {
        ":title": title,
        ":text": text,
        ":images": uploadedImages,
      },
      ReturnValues: "UPDATED_NEW",
    }

    const result = await db.update(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    }
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: error.message }),
    }
  }
}
