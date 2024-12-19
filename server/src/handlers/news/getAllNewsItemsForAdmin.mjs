import { db } from "../../util/db.mjs"

export const getAllNewsItemForAdmin = async (event) => {
  try {
    const { limit, page } = event.queryStringParameters

    const params = {
      TableName: process.env.news_table,
    }

    const result = await db.scan(params).promise()

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResult = result?.Items?.slice(startIndex, endIndex)

    if (!result.Items || result.Items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No items found" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        news: paginatedResult,
        pagination: {
          currentPage: page,
          hasNextPage: endIndex < result.Items.length,
          totalNewsArticles: result.Items.length,
          totalPages: Math.ceil(result.Items.length / limit),
        },
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    }
  }
}
