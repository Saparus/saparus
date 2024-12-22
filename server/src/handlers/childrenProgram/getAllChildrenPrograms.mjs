import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getAllChildrenPrograms = async (event) => {
  const { language, limit, page } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  try {
    const params = {
      TableName: process.env.CHILDREN_PROGRAMS_TABLE,
    }

    const scanCommand = new ScanCommand(params)
    const { Items: programs } = await db.send(scanCommand)

    if (!programs) {
      return {
        statusCode: 404,
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
      body: JSON.stringify({ message: "Error fetching program" }),
    }
  }
}
