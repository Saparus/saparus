import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "./db.mjs"

export const updateGlobalCategories = async (categories, imageURL) => {
  const categoryParams = {
    TableName: process.env.CATEGORIES_TABLE,
    Key: { id: "categories" },
  }

  const { Item } = await db.send(new GetCommand(categoryParams))
  const globalCategories = Item?.categories || {}

  Object.entries(categories).forEach(([language, languageCategories]) => {
    if (!globalCategories[language]) {
      globalCategories[language] = {}
    }

    Object.entries(languageCategories).forEach(([categoryKey, categoryValue]) => {
      if (!globalCategories[language][categoryKey]) {
        globalCategories[language][categoryKey] = {}
      }

      Object.entries(categoryValue).forEach(([languageSpecificCategory, value]) => {
        if (!globalCategories[language][categoryKey][languageSpecificCategory]) {
          globalCategories[language][categoryKey][languageSpecificCategory] = []
        }

        const exists = globalCategories[language][categoryKey][languageSpecificCategory].some(
          (existingItem) => existingItem.name === value.name
        )

        if (!exists && value) {
          globalCategories[language][categoryKey][languageSpecificCategory].push(value)

          if (categoryKey === "company" && imageURL) {
            delete value.image

            if (!imageURL) return

            value.imageURL = imageURL
          }
        }
      })
    })
  })

  const putParams = {
    TableName: process.env.CATEGORIES_TABLE,
    Item: { id: "categories", categories: globalCategories },
  }

  await db.send(new PutCommand(putParams, { removeUndefinedValues: true }))
}
