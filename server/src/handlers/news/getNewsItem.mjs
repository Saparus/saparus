import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getNewsItem = async (event) => {
  const { language } = event.queryStringParameters
  const { id } = event.pathParameters

  if (!id || !language) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,GET",
      },
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

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
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": process.env.CLIENT_URL,
          "Access-Control-Allow-Methods": "OPTIONS,GET",
        },
        body: JSON.stringify({ message: "News item not found" }),
      }
    }

    const { title, text } = newsItem

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,GET",
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
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,GET",
      },
      body: JSON.stringify({ message: "Error fetching news item" }),
    }
  }
}
