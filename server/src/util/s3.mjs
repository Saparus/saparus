import sharp from "sharp"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuid } from "uuid"

const s3 = new S3Client({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
})

export const uploadImage = async (image, folder) => {
  const base64Data = image.split(",")[1]
  const imageBuffer = Buffer.from(base64Data, "base64")

  const imageKeyBase = `${folder}/${uuid()}`

  try {
    const originalBuffer = await sharp(imageBuffer).webp().toBuffer()

    const sizes = [
      { suffix: "/s", height: 200 },
      { suffix: "/m", height: 500 },
      { suffix: "/o", height: null },
    ]

    const uploadPromises = sizes.map(async ({ suffix, height }) => {
      const resizedBuffer = height
        ? await sharp(originalBuffer).resize({ height }).webp().toBuffer() // Resize based on height
        : originalBuffer // Use original if no resizing

      const imageKey = `${imageKeyBase}${suffix}.webp`
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageKey,
        Body: resizedBuffer,
        ContentType: "image/webp", // WebP content type
      }

      const putObjectCommand = new PutObjectCommand(params)
      await s3.send(putObjectCommand)

      return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`
    })

    const imageUrls = await Promise.all(uploadPromises)

    return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${imageKeyBase}`
  } catch (error) {
    console.error("Error processing or uploading image:", error)
    throw error
  }
}
