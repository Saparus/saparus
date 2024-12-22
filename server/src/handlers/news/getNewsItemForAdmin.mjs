import { ScanCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"

export const getNewsItemForAdmin = async (event) => {
  try {
    const { id } = event.pathParameters

    const params = {
      TableName: process.env.NEWS_TABLE,
      Key: { id },
    }

    const scanCommand = new ScanCommand(params)
    const { Item: newsItem } = await db.send(scanCommand)

    if (!newsItem) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No items found" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(newsItem),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    }
  }
}