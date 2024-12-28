import { GetItemCommand } from "@aws-sdk/client-dynamodb"
import jwt from "jsonwebtoken"

import { db } from "../../util/db.mjs"

export const authorizerFun = async (event, context, callback) => {
  try {
    const token = event.headers?.Authorization?.split(" ")[1]
    if (!token) throw new Error("Unauthorized: No token provided")

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const params = {
      TableName: process.env.USER_TABLE,
      Key: { id: decoded.id },
    }

    const getItemCommand = new GetItemCommand(params)

    const { Item: user } = await db.send(getItemCommand)

    if (!user) throw new Error("Unauthorized: User not found")

    // Generate policy based on user role
    const policy = generatePolicy(user, "Allow", event.methodArn)
    callback(null, policy)
  } catch (error) {
    console.error(error)
    callback("Unauthorized")
  }
}

const generatePolicy = (user, effect, resource) => {
  const authResponse = {
    principalId: user.id || "anonymous",
  }

  if (effect && resource) {
    const policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    }

    authResponse.policyDocument = policyDocument
  }

  authResponse.context = {
    role: user.role,
  }
  return authResponse
}
