import { getItem } from "../../util/db.mjs"

export const getCategories = async (event) => {
  try {
    const params = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: {
        id: "categories",
      },
    }

    const { Item } = await getItem(params)

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
