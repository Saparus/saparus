import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"
import { QueryCommand, PutItemCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"

export const register = async (event) => {
  const { email, username, password } = JSON.parse(event.body)

  // Validate input
  if (!email || !username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  // Check if user already exists
  const queryParams = {
    TableName: process.env.USERS_TABLE,
    IndexName: "EmailIndex",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email },
    },
  }

  const queryCommand = new QueryCommand(queryParams)

  try {
    const { Items: existingUsers } = await db.send(queryCommand)

    if (existingUsers.length > 0) {
      throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const params = {
      TableName: process.env.USERS_TABLE,
      Item: {
        id: uuid(),
        email: email,
        username: username,
        hashedPassword: hashedPassword,
      },
    }

    const putItemCommand = new PutItemCommand(params)
    await db.send(putItemCommand)

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User created successfully" }),
    }
  } catch (err) {
    console.error(err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    }
    if (process.env.MODE === "dev") {
      response.body = JSON.stringify({ message: "Internal server error", error: err.message })
    }
    return response
  }
}
