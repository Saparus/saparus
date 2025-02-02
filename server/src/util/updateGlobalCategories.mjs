import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "./db.mjs"

export const updateGlobalCategories = async (categories, imageURL) => {
  // params to get the current categories item from dynamodb
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

    // if the passed object has a 'categories' property, use that
    const inputCategories = categories.categories ? categories.categories : categories

    Object.entries(inputCategories).forEach(([language, languageCategories]) => {
      // ensure globalCategories has an object for the current language
      if (!globalCategories[language]) {
        globalCategories[language] = {}
      }

      Object.entries(languageCategories).forEach(([categoryKey, categoryValue]) => {
        // ensure globalCategories has an object for the current main category key
        if (!globalCategories[language][categoryKey]) {
          globalCategories[language][categoryKey] = {}
        }

        Object.entries(categoryValue).forEach(([languageSpecificCategory, values]) => {
          // ensure globalCategories has an array for the specific language category key
          if (!globalCategories[language][categoryKey][languageSpecificCategory]) {
            globalCategories[language][categoryKey][languageSpecificCategory] = []
          }

          console.log("values:", JSON.stringify(values, null, 2))

          Object.values(values).forEach((value) => {
            if (!value?.name) return

            const existingIndex = globalCategories[language][categoryKey][
              languageSpecificCategory
            ].findIndex((item) => item.name === value.name)

            if (existingIndex === -1) {
              // adding new category if it does not exist
              console.log(`adding (${JSON.stringify(value)}) to global categories`)
              globalCategories[language][categoryKey][languageSpecificCategory].push(value)
            } else if (categoryKey === "company" && imageURL) {
              // if the company exists, update its imageURL with the provided imageURL
              console.log(`updating imageURL (${imageURL}) for ${value.name} company`)
              globalCategories[language][categoryKey][languageSpecificCategory][
                existingIndex
              ].imageURL = imageURL
            }
          })

          console.log(
            "globalCategories after adding space:",
            JSON.stringify(globalCategories, null, 2)
          )
        })

        if (categoryKey === "company" && imageURL) {
          globalCategories[language][categoryKey].imageURL = imageURL
        }
      })
    })

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
