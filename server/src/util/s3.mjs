import sharp from "sharp"
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuid } from "uuid"

const s3 = new S3Client({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
})

export const uploadImage = async (
  image,
  folder,
  sizes = [
    { suffix: "/s", height: 200 },
    { suffix: "/m", height: 500 },
    { suffix: "/o", height: null },
  ],
  name
) => {
  if (!image) return

  const base64Data = image.split(",")[1]
  const imageBuffer = Buffer.from(base64Data, "base64")

  const imageKeyBase = `${folder}/${name || uuid()}`

  const cleanImageKeyBase = imageKeyBase.replace(/(\/s|\/m|\/o)\.webp$/, "")

  try {
    const originalBuffer = await sharp(imageBuffer).webp().toBuffer()

    const uploadPromises = sizes.map(async ({ suffix, height }) => {
      const resizedBuffer = height
        ? await sharp(originalBuffer).resize({ height }).webp().toBuffer()
        : originalBuffer

      const imageKey = `${cleanImageKeyBase}${suffix}.webp`
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageKey,
        Body: resizedBuffer,
        ContentType: "image/webp",
      }

      const putObjectCommand = new PutObjectCommand(params)
      await s3.send(putObjectCommand)

      return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`
    })

    const imageUrls = await Promise.all(uploadPromises)

    return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${cleanImageKeyBase}`
  } catch (error) {
    console.error("Error processing or uploading image:", error)
    throw error
  }
}

export const deleteImage = async (imageId, folder) => {
  const imageKeyBase = `${folder}/${imageId}`

  const cleanImageKeyBase = imageKeyBase.replace(/(\/s|\/m|\/o)\.webp$/, "")

  const imageVersions = [{ suffix: "/s.webp" }, { suffix: "/m.webp" }, { suffix: "/o.webp" }]

  try {
    const deletePromises = imageVersions.map(async ({ suffix }) => {
      const imageKey = `${cleanImageKeyBase}${suffix}`
      const deleteParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageKey,
      }
      const deleteObjectCommand = new DeleteObjectCommand(deleteParams)
      await s3.send(deleteObjectCommand)
    })

    await Promise.all(deletePromises)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Image copies deleted successfully" }),
    }
  } catch (error) {
    console.error("Error deleting image copies:", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error deleting image copies", error }),
    }
  }
}
