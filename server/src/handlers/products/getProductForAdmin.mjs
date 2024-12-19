import { db } from "../../util/db.mjs"

export const getProductForAdmin = async (event) => {
  try {
    const { id } = event.pathParameters

    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Key: { id },
    }

    const { Item: product } = await db.get(params).promise()

    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Product not found" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    }
  }
}
