import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3 = new S3Client({
  region: "us-west-2",
})

export const uploadImage = async (bucketName, key, body) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: "image/jpeg",
    ACL: "public-read",
  }

  try {
    const data = await s3.send(new PutObjectCommand(params))
    return data
  } catch (err) {
    console.error("Error uploading image:", err)
    throw err
  }
}
