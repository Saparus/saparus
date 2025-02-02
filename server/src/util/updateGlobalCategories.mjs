import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "./db.mjs"

export const updateGlobalCategories = async (categories, imageURL) => {
  const categoryParams = {
    TableName: process.env.CATEGORIES_TABLE,
    Key: { id: "categories" },
  }

  try {
    const { Item } = await db.send(new GetCommand(categoryParams))
    const globalCategories = Item?.categories || {}

    console.log("imageURL:", JSON.stringify(imageURL, null, 2))
    console.log("categories:", JSON.stringify(categories, null, 2))
    console.log("globalCategories before adding space:", JSON.stringify(globalCategories, null, 2))

    Object.entries(categories).forEach(([language, languageCategories]) => {
      if (!globalCategories[language]) {
        globalCategories[language] = {}
      }

      Object.entries(languageCategories).forEach(([categoryKey, categoryValue]) => {
        if (!globalCategories[language][categoryKey]) {
          globalCategories[language][categoryKey] = {}
        }

        Object.entries(categoryValue).forEach(([languageSpecificCategory, values]) => {
          if (!globalCategories[language][categoryKey][languageSpecificCategory]) {
            globalCategories[language][categoryKey][languageSpecificCategory] = []
          }

          console.log(
            "globalCategories after adding space:",
            JSON.stringify(globalCategories, null, 2)
          )
          console.log("values:", JSON.stringify(values, null, 2))
        })
      })
    })

    const putParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Item: { id: "categories", categories: globalCategories },
    }

    await db.send(new PutCommand(putParams, { removeUndefinedValues: true }))
  } catch (error) {
    console.error("Error updating global categories:", error)
    throw error
  }
}
