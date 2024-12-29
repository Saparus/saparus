import { ScanCommand } from "@aws-sdk/lib-dynamodb"
import { db } from "../../util/db.mjs"

export const getAllAboutItems = async (event) => {
  const { language, limit, page } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const params = {
    TableName: process.env.ABOUT_TABLE,
  }

  const scanCommand = ScanCommand(params)

  try {
    const { Items: aboutItems } = await db.send(scanCommand)

    const translatedResult = aboutItems.map((newsItem) => {
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
    console.error("Error getting about items", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error getting about items", error }),
    }
  }
}
