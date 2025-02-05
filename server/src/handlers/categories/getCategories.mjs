import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { summarizeCategoryData } from "../../util/summarizeCategoryData.mjs"

export const getCategories = async (event) => {
  try {
    const params = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: {
        id: "categories",
      },
    }

    const getCommand = new GetCommand(params)
    const { Item } = await db.send(getCommand)

    const categories = Item?.categories

    if (!categories) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Categories not found" }),
      }
    }

    const scanParams = {
      TableName: process.env.PRODUCTS_TABLE,
    }

    const scanCommand = new ScanCommand(scanParams)
    const { Items: products } = await db.send(scanCommand)

    const summarizedData = summarizeCategoryData(products, categories)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(summarizedData),
    }
  } catch (error) {
    console.error("Error fetching categories:", error)

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Failed to fetch categories" }),
    }
  }
}
