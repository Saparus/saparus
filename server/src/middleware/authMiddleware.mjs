import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb"

dotenv.config()

const client = new DynamoDBClient({})

const dynamoDB = DynamoDBDocumentClient.from(client)

const tableName = "users"

export const authMiddleware = async (handler) => async (event) => {
  if (event.headers.authorization && event.headers.authorization.startsWith("Bearer")) {
    try {
      // gets token from header
      token = event.headers.authorization.split(" ")[1]

      // verifies token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // finds user by ID from the accounts array
      const params = {
        TableName: tableName,
        Key: { userId: decoded.userId },
      }

      const result = await dynamoDB.get(params).promise()

      // attaches user id to the event.requestContext object
      event.requestContext.authorizer = { userId: result.userId }

      next()
    } catch (error) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      }
    }
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Unauthorized, no token" }),
    }
  }
}
