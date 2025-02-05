import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { summarizeCategoryData } from "../../util/summarizeCategoryData.mjs"

export const getCompanies = async (event) => {
  try {
    const categoryParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: {
        id: "categories",
      },
    }

    const getCommand = new GetCommand(categoryParams)
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

    const productParams = {
      TableName: process.env.PRODUCTS_TABLE,
    }

    const scanCommand = new ScanCommand(productParams)
    const { Items: products } = await db.send(scanCommand)

    const summarizedData = summarizeCategoryData(products, categories)

    const companyCategory = summarizedData.find((category) => (category.key = "company"))

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(companyCategory),
    }
  } catch (error) {
    console.error("Error fetching companies:", error)

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Failed to fetch companies" }),
    }
  }
}
