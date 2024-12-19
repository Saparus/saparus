import { db } from "../../util/db.mjs"

export const getAllChildrenPrograms = async (event) => {
  const { language, limit, page } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  try {
    const params = {
      TableName: process.env.children_program_table,
    }

    const result = await db.scan(params).promise()

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Program not found" }),
      }
    }

    const translatedResult = result.Items.map((program) => ({
      ...program,
      text: program.text[languageToApply],
      title: program.title[languageToApply],
    }))

    translatedResult.sort((a, b) => a.date - b.date)

    const startIndex = (page - 1) * limit
    const paginatedResult = translatedResult.slice(startIndex, startIndex + limit)

    return {
      statusCode: 200,
      body: JSON.stringify({
        articles: paginatedResult,
        pagination: {
          currentPage: page,
          hasNextPage: startIndex + limit < translatedResult.length,
          totalArticles: translatedResult.length,
          totalPages: Math.ceil(translatedResult.length / limit),
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
