import { db } from "../../util/db.mjs"

export const getProductForAdmin = async (event) => {
  try {
    const { id } = event.pathParameters

    const params = {
      TableName: process.env.product_table,
      Key: { id },
    }

    const result = await db.get(params).promise()

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Product not found" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    }
  }
}
