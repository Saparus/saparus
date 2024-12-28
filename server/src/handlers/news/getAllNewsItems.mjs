import { ScanCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"

export const getAllNewsItems = async (event) => {
  const { language, limit, page } = event.queryStringParameters

  if (!language || !limit || !page) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const params = {
    TableName: process.env.NEWS_TABLE,
  }

  const scanCommand = new ScanCommand(params)
  try {
    const { Items: newsItems } = await db.send(scanCommand)

    const translatedResult = newsItems.map((newsItem) => {
      const tempNewsItem = { ...newsItem }
      tempNewsItem.text = newsItem.text[languageToApply]
      tempNewsItem.title = newsItem.title[languageToApply]

      return tempNewsItem
    })

    translatedResult.sort((a, b) => a.date - b.date)

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResult = translatedResult.slice(startIndex, endIndex)

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
          hasNextPage: endIndex < translatedResult.length,
          totalNewsArticles: translatedResult.length,
          totalPages: Math.ceil(translatedResult.length / limit),
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
      body: JSON.stringify({ message: "Error fetching news items" }),
    }
  }
}
