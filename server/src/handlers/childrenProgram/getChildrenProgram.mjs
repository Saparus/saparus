import { db } from "../../util/db.mjs"

export const getChildrenProgram = async (event) => {
  const { id } = event.pathParameters
  const { language, limit, page } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  try {
    const params = {
      TableName: process.env.children_program_table,
      Key: { id },
    }

    const result = await db.get(params).promise()

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Program not found" }),
      }
    }

    const { title, text } = result.Item

    translatedResult.sort((a, b) => a.date - b.date)

    const startIndex = (page - 1) * limit
    const paginatedResult = translatedResult.slice(startIndex, startIndex + limit)

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...result.Item,
        title: title[languageToApply],
        text: text[languageToApply],
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching program" }),
    }
  }
}
