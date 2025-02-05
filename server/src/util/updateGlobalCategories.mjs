import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "./db.mjs"

export const updateGlobalCategories = async (categories, imageURL) => {
  // params to get current categories item from dynamodb
  const categoryParams = {
    TableName: process.env.CATEGORIES_TABLE,
    Key: { id: "categories" },
  }

  try {
    const { Item } = await db.send(new GetCommand(categoryParams))
    // current global categories or empty object if none exists
    const globalCategories = Item?.categories || {}

    console.log("imageURL:", JSON.stringify(imageURL, null, 2))
    console.log("categories:", JSON.stringify(categories, null, 2))
    console.log("globalCategories before:", JSON.stringify(globalCategories, null, 2))

    categories.forEach((category) => {
      if (globalCategories.find((globalCategory) => globalCategory.key === category.key)) {
        if (!globalCategories.value.en.includes(category.value.en)) {
          const languages = Object.keys(globalCategories)

          languages.forEach((language) => {
            globalCategories.value?.[language].push(globalCategories.value?.[language])
          })
        }
      }

      if (globalCategories.find((globalCategory) => globalCategory.key !== category.key)) {
        const languages = Object.keys(globalCategories)

        const newValue = languages.map((language) => ({
          [language]: [...globalCategories.value, category.value],
        }))

        globalCategories.push({ ...category, value: newValue })
      }
    })

    console.log("globalCategories after:", JSON.stringify(globalCategories, null, 2))

    // params to update the categories item in dynamodb
    const putParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Item: { id: "categories", categories: globalCategories },
    }

    // updating dynamodb with the new globalCategories
    await db.send(new PutCommand(putParams, { removeUndefinedValues: true }))
  } catch (error) {
    console.error("error updating global categories:", error)
    throw error
  }
}
