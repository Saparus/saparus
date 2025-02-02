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

          const existingEntries = globalCategories[language][categoryKey][languageSpecificCategory]
          const existingNames = new Set(existingEntries.map((item) => item.name))

          values.forEach((value) => {
            if (!value || !value.name) return

            if (!existingNames.has(value.name)) {
              const newValue = { ...value }
              if (imageURL) {
                delete newValue.image
                newValue.imageURL = imageURL
              }
              existingEntries.push(newValue)
              existingNames.add(newValue.name)
            } else if (categoryKey === "company" && imageURL) {
              const existingValue = existingEntries.find((item) => item.name === value.name)
              if (existingValue && !existingValue.imageURL) {
                delete existingValue.image
                existingValue.imageURL = imageURL
              }
            }
          })
        })
      })
    })

    const putParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Item: { id, categories: globalCategories },
    }

    await db.send(new PutCommand(putParams, { removeUndefinedValues: true }))
  } catch (error) {
    console.error("Error updating global categories:", error)
    throw error
  }
}
