import { DeleteCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const deleteProduct = async (event) => {
  const { id } = event.pathParameters

  if (!id) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    Key: { id },
  }

  const deleteCommand = new DeleteCommand(params)

  try {
    await db.send(deleteCommand)

    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "News item deleted successfully" }),
    }
  } catch (error) {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: error.message }),
    }
  }
}
