import { GetCommand } from "@aws-sdk/lib-dynamodb"
import jwt from "jsonwebtoken"

import { db } from "../../util/db.mjs"

export const authorize = async (event) => {
  try {
    const token = event.headers?.Authorization?.split(" ")[1]
    if (!token) throw new Error("Unauthorized: No token provided")

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const params = {
      TableName: process.env.USER_TABLE,
      Key: { id: decoded.id },
    }

    const getCommand = new GetCommand(params)
    const result = await db.send(getCommand)

    const user = result.Item

    if (!user) throw new Error("Unauthorized: User not found")

    // return user id or full user object
    return user // return entire user object if needed
  } catch (error) {
    throw new Error("Unauthorized: Invalid or expired token")
  }
}
