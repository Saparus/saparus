import { GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getCompanies = async (event) => {
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

    // extract the company category
    const companies = {}
    Object.keys(categories).forEach((language) => {
      if (categories[language].company) {
        companies[language] = categories[language].company
      }
    })

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(companies.en.company),
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
