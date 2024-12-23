import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getAllNewsItemForAdmin = async (event) => {
  const { limit, page } = event.queryStringParameters

  if (!limit || !page) {
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
  }

  const scanCommand = new ScanCommand(params)

  try {
    const { Items: newsItems } = await db.send(scanCommand)

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResult = newsItems.slice(startIndex, endIndex)

    if (!newsItems || newsItems.length === 0) {
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
      body: JSON.stringify({
        news: paginatedResult,
        pagination: {
          currentPage: page,
          hasNextPage: endIndex < newsItems.length,
          totalNewsArticles: newsItems.length,
          totalPages: Math.ceil(newsItems.length / limit),
        },
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: error.message }),
    }
  }
}
