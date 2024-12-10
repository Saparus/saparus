import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb"
import { uuidv4 } from "uuid"

dotenv.config()

const client = new DynamoDBClient({})

const dynamoDB = DynamoDBDocumentClient.from(client)

const tableName = "users"

// POST /auth/login
export const login = async (event) => {
  const { username, password } = JSON.parse(event.body)

  const params = {
    TableName: tableName,
    Key: {
      username: username,
    },
  }

  try {
    const data = await dynamoDB.send(new GetCommand(params))
    const user = data.Item

    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" })
      return {
        statusCode: 200,
        body: JSON.stringify({ token }),
      }
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      }
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    }
  }
}

// POST /auth/register
export const register = async (event) => {
  const { username, password } = JSON.parse(event.body)

  const hashedPassword = await bcrypt.hash(password, 10)

  const params = {
    TableName: tableName,
    Item: {
      id: uuidv4(),
      username: username,
      hashedPassword: hashedPassword,
    },
  }

  try {
    await dynamoDB.put(params).promise()
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
