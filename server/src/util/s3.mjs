import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3 = new S3Client({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
})

export const uploadImage = async (bucketName, key, body) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: "image/jpeg",
  }

  const putObjectCommand = new PutObjectCommand(params)

  try {
    const data = await s3.send(putObjectCommand)
    return data
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}
