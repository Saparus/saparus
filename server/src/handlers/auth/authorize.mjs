import jwt from "jsonwebtoken"
import { db } from "./db.mjs"

export const authorize = async (event) => {
  try {
    const token = event.headers?.Authorization?.split(" ")[1]
    if (!token) throw new Error("Unauthorized: No token provided")

    // decode and verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // fetch user from DynamoDB
    const params = {
      TableName: process.env.USER_TABLE,
      Key: { id: decoded.id },
    }

    const result = await db.get(params).promise()
    if (!result.Item) throw new Error("Unauthorized: User not found")

    // return user id or full user object
    return result.Item // return entire user object if needed
  } catch (error) {
    throw new Error("Unauthorized: Invalid or expired token")
  }
}
