import { db } from "../../util/db.mjs"

export const getNewsItem = async (event) => {
  try {
    const { language } = event.queryStringParameters
    const { id } = event.pathParameters

    const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

    const params = {
      TableName: process.env.NEWS_TABLE,
      Key: { id },
    }

    const { Item: newsItem } = await db.get(params).promise()

    if (!newsItem) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "News item not found" }),
      }
    }

    const { title, text } = newsItem

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...newsItem,
        title: title[languageToApply],
        text: text[languageToApply],
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching news item" }),
    }
  }
}
