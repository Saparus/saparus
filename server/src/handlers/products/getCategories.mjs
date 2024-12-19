import { db } from "../../util/db.mjs"
import { summarizeCategoryData } from "../../util/summarizeCategoryData"

export const getCategories = async (event) => {
  try {
    const params = {
      TableName: process.env.PRODUCTS_TABLE,
    }

    const { Items: products } = await db.scan(params).promise()
    const categories = summarizeCategoryData(products)

    return {
      statusCode: 200,
      body: JSON.stringify(categories),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching categories" }),
    }
  }
}
