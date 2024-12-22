import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { QueryCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const login = async (event) => {
  const { email, password } = JSON.parse(event.body)

  // Validate input
  if (!email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  // Fetch user from database
  const params = {
    TableName: process.env.USERS_TABLE,
    IndexName: "EmailIndex",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  }

  const command = new QueryCommand(params)
  const result = await db.send(command)

  try {
    if (result.Items.length === 0) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": process.env.CLIENT_URL,
          "Access-Control-Allow-Methods": "OPTIONS,POST",
        },
        body: JSON.stringify({ message: "Invalid email or password" }),
      }
    }

    const user = result.Items[0]

    // Verify password
    const validPassword = await bcrypt.compare(password, user.hashedPassword)
    if (!validPassword) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": process.env.CLIENT_URL,
          "Access-Control-Allow-Methods": "OPTIONS,POST",
        },
        body: JSON.stringify({ message: "Invalid email or password" }),
      }
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET)

    // const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    //   expiresIn: "30d",
    // })

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,POST",
      },
      body: JSON.stringify({ token }),
    }
  } catch (error) {
    console.error(err)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,POST",
      },
      body: JSON.stringify({ message: "Internal server error" }),
    }
  }
}
