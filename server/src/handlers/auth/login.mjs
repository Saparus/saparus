import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { QueryCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"

export const login = async (event) => {
  const { email, password } = JSON.parse(event.body)

  // Validate input
  if (!email || !password) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  // Fetch user from database
  const params = {
    TableName: process.env.USERS_TABLE,
    IndexName: "EmailIndex",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email },
    },
  }

  const queryCommand = new QueryCommand(params)

  try {
    const { Items: users } = await db.send(queryCommand)

    if (users.length === 0) {
      throw new Error("Invalid email or password")
    }

    const user = users[0]

    // Verify password
    const validPassword = bcrypt.compare(password, user.hashedPassword)
    if (!validPassword) {
      throw new Error("Invalid email or password")
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET)

    // const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    //   expiresIn: "30d",
    // })

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ token }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Internal server error" }),
    }
  }
}
