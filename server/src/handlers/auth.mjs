import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import AWS from "aws-sdk"
import bcrypt from "bcrypt"

dotenv.config()

const dynamoDb = new AWS.DynamoDB.DocumentClient()

// POST /auth/login
export const login = async (event) => {
  const { username, password } = JSON.parse(event.body)

  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      username: username,
    },
  }

  try {
    const data = await dynamoDb.get(params).promise()
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
    TableName: process.env.USERS,
    Item: {
      id: uuidv4(),
      username: username,
      hashedPassword: hashedPassword,
    },
  }

  try {
    await dynamoDb.put(params).promise()
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
