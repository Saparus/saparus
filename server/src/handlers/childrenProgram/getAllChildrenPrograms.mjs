import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getAllChildrenPrograms = async (event) => {
  const { language, limit, page } = event.queryStringParameters

  if (!language || !limit || !page) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,PATCH",
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

    if (!programs) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": process.env.CLIENT_URL,
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE",
        },
        body: JSON.stringify({ message: "Program not found" }),
      }
    }

    const translatedPrograms = programs.map((program) => ({
      ...program,
      text: program.text[languageToApply],
      title: program.title[languageToApply],
    }))

    translatedPrograms.sort((a, b) => a.date - b.date)

    const startIndex = (page - 1) * limit
    const paginatedPrograms = translatedPrograms.slice(startIndex, startIndex + limit)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE",
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
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE",
      },
      body: JSON.stringify({ message: "Error fetching program" }),
    }
  }
}
