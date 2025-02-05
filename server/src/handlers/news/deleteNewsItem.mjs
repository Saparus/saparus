import { DeleteCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const deleteNewsItem = async (event) => {
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
    TableName: process.env.NEWS_TABLE,
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
    console.error("Error deleting news item", error)
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error deleting news item", error }),
    }
  }
}
