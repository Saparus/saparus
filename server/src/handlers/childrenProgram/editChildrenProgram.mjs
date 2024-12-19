import { db } from "../../util/db.mjs"

export const editChildrenProgram = async (event) => {
  try {
    const { id } = event.pathParameters
    const { title, text, images } = JSON.parse(event.body)

    const uploadedImages = await Promise.all(
      images.map(async (image, index) => {
        const imageBuffer = Buffer.from(image, "base64")
        const key = `children-programs/${uuid()}-${index}`

        const uploadParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: key,
          Body: imageBuffer,
          ContentType: "image/jpeg", // we will think about webp later
          ACL: "public-read",
        }

        await s3.upload(uploadParams).promise()

        return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`
      })
    )

    const params = {
      TableName: process.env.children_program_table,
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
