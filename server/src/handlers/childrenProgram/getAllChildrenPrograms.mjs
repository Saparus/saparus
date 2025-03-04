import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getAllChildrenPrograms = async (event) => {
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
    TableName: process.env.CHILDREN_PROGRAMS_TABLE,
  }

  const scanCommand = new ScanCommand(params)

  try {
    const { Items: programs } = await db.send(scanCommand)

    const translatedPrograms = programs.map((program) => ({
      ...program,
      text: program.text[languageToApply],
      title: program.title[languageToApply],
      images: program.images.map((image) => image + "/m.webp"),
    }))

    translatedPrograms.sort((a, b) => b.date - a.date)

    const startIndex = (page - 1) * limit
    const paginatedPrograms = translatedPrograms.slice(startIndex, startIndex + limit)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        articles: paginatedPrograms,
        pagination: {
          currentPage: page,
          hasNextPage: startIndex + limit < translatedPrograms.length,
          totalArticles: translatedPrograms.length,
          totalPages: Math.ceil(translatedPrograms.length / limit),
        },
      }),
    }
  } catch (error) {
    console.error("Error fetching program", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error fetching program" }),
    }
  }
}
