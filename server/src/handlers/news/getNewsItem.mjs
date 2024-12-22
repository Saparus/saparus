import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getNewsItem = async (event) => {
  try {
    const { language = "en" } = event.queryStringParameters
    const { id } = event.pathParameters

    const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

    const params = {
      TableName: process.env.NEWS_TABLE,
      Key: { id },
    }

    const scanCommand = new ScanCommand(params)
    const { Item: newsItem } = await db.send(scanCommand)

    if (!newsItem) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE",
        },
        body: JSON.stringify({ message: "News item not found" }),
      }
    }

    const { title, text } = newsItem

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE",
      },
      body: JSON.stringify({
        ...newsItem,
        title: title[languageToApply],
        text: text[languageToApply],
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
      body: JSON.stringify({ message: "Error fetching news item" }),
    }
  }
}
