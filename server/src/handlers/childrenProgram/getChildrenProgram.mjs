import { db } from "../../util/db.mjs"

export const getChildrenProgram = async (event) => {
  const { id } = event.pathParameters
  const { language } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  try {
    const params = {
      TableName: process.env.CHILDREN_PROGRAMS_TABLE,
      Key: { id },
    }

    const { Item: program } = await db.get(params).promise()

    if (!program) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Program not found" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...program,
        title: program.title[languageToApply],
        text: program.text[languageToApply],
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching program" }),
    }
  }
}
