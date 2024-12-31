import { ScanCommand } from "@aws-sdk/lib-dynamodb"
import { db } from "../../util/db.mjs"

export const getAllAboutItems = async (event) => {
  const { language } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const params = {
    TableName: process.env.ABOUT_TABLE,
  }

  const scanCommand = new ScanCommand(params)

  try {
    const { Items: aboutItems } = await db.send(scanCommand)

    const translatedResult = aboutItems.map((newsItem) => {
      const tempNewsItem = { ...newsItem }
      tempNewsItem.text = newsItem.text[languageToApply]
      tempNewsItem.title = newsItem.title[languageToApply]

      return tempNewsItem
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        aboutItems: translatedResult,
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
