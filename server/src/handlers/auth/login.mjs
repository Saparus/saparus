import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { db } from "../../util/db.mjs"
import { QueryCommand } from "@aws-sdk/lib-dynamodb"

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

  try {
    const result = await db.send(command)
    if (result.Items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid email or password" }),
      }
    }

    const user = result.Items[0]

    // Verify password
    const validPassword = await bcrypt.compare(password, user.hashedPassword)
    if (!validPassword) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid email or password" }),
      }
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    }
  }
}
