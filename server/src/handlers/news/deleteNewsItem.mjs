import { db } from "../../util/db.mjs"

export const deleteNewsItem = async (event) => {
  try {
    const { id } = event.pathParameters

    const params = {
      TableName: process.env.NEWS_TABLE,
      Key: { id },
    }

    await db.delete(params).promise()

    return {
      statusCode: 204,
    }
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: error.message }),
    }
  }
}
