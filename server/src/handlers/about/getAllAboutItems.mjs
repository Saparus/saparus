import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getAllAboutItems = async (event) => {
  const { language } = event.queryStringParameters

  if (!language) {
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
    TableName: process.env.ABOUT_TABLE,
  }

  const scanCommand = new ScanCommand(params)

  try {
    const { Items: aboutItems } = await db.send(scanCommand)

    const translatedAboutItems = aboutItems.map((aboutItem) => ({
      ...aboutItem,
      text: aboutItem.text[languageToApply],
      title: aboutItem.title[languageToApply],
      image: aboutItem.image + "/m.webp",
    }))

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        aboutItems: translatedAboutItems,
      }),
    }
  } catch (error) {
    console.error("Error getting about items", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error getting about items", error }),
    }
  }
}
