import { GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getNewsItem = async (event) => {
  const { id } = event.pathParameters
  const { language } = event.queryStringParameters

  if (!id || !language) {
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

  try {
    const params = {
      TableName: process.env.NEWS_TABLE,
      Key: { id },
    }

    const getCommand = new GetCommand(params)
    const { Item: newsItem } = await db.send(getCommand)

    if (!newsItem) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "News not found" }),
      }
    }

    const { title, text } = newsItem

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        ...newsItem,
        title: title[languageToApply],
        text: text[languageToApply],
        images: newsItem.images.map((image) => image + "/o.webp"),
      }),
    }
  } catch (error) {
    console.error("Error fetching news item", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error fetching news item" }),
    }
  }
}
