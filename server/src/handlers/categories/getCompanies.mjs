import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { summarizeCategoryData } from "../../util/summarizeCategoryData.mjs"

export const getCompanies = async (event) => {
  try {
    // Fetch categories
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

    // Fetch products
    const productParams = {
      TableName: process.env.PRODUCTS_TABLE,
    }

    const scanCommand = new ScanCommand(productParams)
    const { Items: products } = await db.send(scanCommand)

    // Summarize category data
    const summarizedData = summarizeCategoryData(products, categories)

    // Filter companies to only include those with products
    const companies = {}
    Object.keys(summarizedData.categories).forEach((language) => {
      if (summarizedData.categories[language].company) {
        companies[language] = summarizedData.categories[language].company.values.filter(
          (company) => company.amount > 0
        )
      }
    })

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(companies),
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
