import { GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getCategories = async (event) => {
  try {
    const params = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: {
        id: "categories",
      },
    }

    const getCommand = new GetCommand(params)
    const { Item: categories } = await db.send(getCommand)

    if (!Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Categories not found" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(Item.categories),
    }
  } catch (error) {
    console.error("Error fetching categories:", error)

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch categories" }),
    }
  }
}
