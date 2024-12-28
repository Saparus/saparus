import { ScanCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"

export const getNewsItemForAdmin = async (event) => {
  const { id } = event.pathParameters

  const params = {
    TableName: process.env.NEWS_TABLE,
    Key: { id },
  }

  const scanCommand = new ScanCommand(params)

  try {
    const { Item: newsItem } = await db.send(scanCommand)

    if (!newsItem) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "No items found" }),
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(newsItem),
    }
  } catch (error) {
    console.error("Error fetching news item", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error fetching news item", error }),
    }
  }
}
