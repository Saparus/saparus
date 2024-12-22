import { ScanCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"
import { summarizeCategoryData } from "../../util/summarizeCategoryData"

export const getCategories = async (event) => {
  try {
    const params = {
      TableName: process.env.PRODUCTS_TABLE,
    }

    const scanCommand = new ScanCommand(params)
    const { Items: products } = await db.send(scanCommand)

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