import { ScanCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"

export const getAllNewsItems = async (event) => {
  const { language = "en", limit = 10, page = 1 } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  try {
    const params = {
      TableName: process.env.NEWS_TABLE,
    }

    const scanCommand = new ScanCommand(params)
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
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE",
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
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE",
      },
      body: JSON.stringify({ message: "Error fetching news items" }),
    }
  }
}
