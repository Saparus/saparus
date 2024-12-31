import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getAllNewsItemsForAdmin = async (event) => {
  const { limit, page, sorting } = event.queryStringParameters

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

    newsItems.sort((a, b) => (sorting === "reverse" ? b.date - a.date : a.date - b.date))

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResult = newsItems.slice(startIndex, endIndex)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        articles: paginatedResult,
        pagination: {
          currentPage: page,
          hasNextPage: endIndex < newsItems.length,
          totalArticles: newsItems.length,
          totalPages: Math.ceil(newsItems.length / limit),
        },
      }),
    }
  } catch (error) {
    console.error("Error fetching news items", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error fetching news items", error }),
    }
  }
}
