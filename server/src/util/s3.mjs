import { v4 as uuid } from "uuid"
import { fromBuffer } from "file-type"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const region = "us-west-2"

const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export const uploadImage = async (bucketName, imageBuffer) => {
  const fileInfo = await fromBuffer(imageBuffer)

  const detectedExt = fileInfo.ext
  const detectedImageType = fileInfo.mime

  if (detectedImageType !== imageType) {
    throw new Error("mime types didn't match")
  }

  const name = uuid()
  const key = `${name}.${detectedExt}`

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: imageBuffer,
    ContentType: detectedImageType,
    ACL: "public-read",
  }

  const putObjectCommand = new PutObjectCommand(params)

  await s3.send(putObjectCommand)

  return `https://${bucketName}.s3-${region}.amazonaws.com/${key}`
}
