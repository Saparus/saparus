import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { summarizeCategoryData } from "../../util/summarizeCategoryData"

export const getCategories = async (event) => {
  const params = {
    TableName: process.env.PRODUCTS_TABLE,
  }

  const scanCommand = new ScanCommand(params)

  try {
    const { Items: products } = await db.send(scanCommand)

    const categories = summarizeCategoryData(products)

    if (!categories || categories.length === 0) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Categories not found" }),
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(categories),
    }
  } catch (error) {
    console.error("Error fetching categories", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error fetching categories" }),
    }
  }
}
