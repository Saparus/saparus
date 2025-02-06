import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "./db.mjs"

export const updateGlobalCategories = async (categories, imageURL) => {
  const categoryParams = {
    TableName: process.env.CATEGORIES_TABLE,
    Key: { id: "categories" },
  }

  try {
    const { Item } = await db.send(new GetCommand(categoryParams))
    const globalCategories = Item?.categories || []

    console.log("imageURL:", JSON.stringify(imageURL, null, 2))
    console.log("categories:", JSON.stringify(categories, null, 2))
    console.log("globalCategories before:", JSON.stringify(globalCategories, null, 2))

    categories.forEach((category) => {
      // find if the category already exists in global categories
      const existingCategory = globalCategories.find(
        (globalCategory) => globalCategory.key === category.key
      )

      if (existingCategory) {
        // for each language, add the new value if it does not already exist
        Object.keys(category.value).forEach((language) => {
          if (!existingCategory.value[language].includes(category.value[language])) {
            existingCategory.value[language].push(category.value[language])
          }
        })
      } else {
        // create a new category with its values wrapped in an array per language
        const newCategory = {
          ...category,
          value: Object.keys(category.value).reduce((acc, language) => {
            acc[language] = [category.value[language]]
            return acc
          }, {}),
        }
        globalCategories.push(newCategory)
      }
    })

    console.log("globalCategories after:", JSON.stringify(globalCategories, null, 2))

    const putParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Item: { id: "categories", categories: globalCategories },
    }

    await db.send(new PutCommand(putParams, { removeUndefinedValues: true }))
  } catch (error) {
    console.error("error updating global categories:", error)
    throw error
  }
}
