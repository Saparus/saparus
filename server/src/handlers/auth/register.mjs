import { v4 as uuid } from "uuid"
import { bcrypt } from "bcrypt"

import { db } from "../../util/db.mjs"

export const register = async (event) => {
  const { email, username, password } = JSON.parse(event.body)

  if (!email || !username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  const existingUserParams = {
    TableName: process.env.USERS_TABLE,
    IndexName: "EmailIndex",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  }

  const existingUser = await db.scan(existingUserParams).promise()
  if (existingUser.Items.length > 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "User already exists" }),
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const params = {
    TableName: process.env.USER_TABLE,
    Item: {
      id: uuid(),
      email: email,
      username: username,
      hashedPassword: hashedPassword,
    },
  }

  try {
    await db.put(params).promise()
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User created successfully" }),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    }
  }
}
