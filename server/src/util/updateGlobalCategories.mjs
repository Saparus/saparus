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
    console.log("globalCategories before update:", JSON.stringify(globalCategories, null, 2))

    // iterate through each language in the passed categories object
    Object.entries(categories).forEach(([language, languageCategories]) => {
      // ensure globalCategories has an object for the current language
      if (!globalCategories[language]) {
        globalCategories[language] = {}
      }

      // iterate through each main category key for the language
      Object.entries(languageCategories).forEach(([mainKey, mainValue]) => {
        // ensure globalCategories has an object for the main category key
        if (!globalCategories[language][mainKey]) {
          globalCategories[language][mainKey] = {}
        }

        // iterate through each language-specific subkey in the main category
        Object.entries(mainValue).forEach(([subKey, value]) => {
          // ensure globalCategories has an array for this subkey
          if (!globalCategories[language][mainKey][subKey]) {
            globalCategories[language][mainKey][subKey] = []
          }

          // if the value does not have a valid name, skip it
          if (!value?.name) return

          // check if an entry with the same name already exists
          const existingIndex = globalCategories[language][mainKey][subKey].findIndex(
            (item) => item.name === value.name
          )

          if (existingIndex === -1) {
            // add new entry if it does not exist
            console.log(`adding (${JSON.stringify(value)}) to globalCategories`)
            globalCategories[language][mainKey][subKey].push(value)
          } else if (mainKey === "company" && imageURL) {
            // if the company entry exists and imageURL is provided, update its imageURL
            console.log(`updating imageURL (${imageURL}) for ${value.name} company`)
            globalCategories[language][mainKey][subKey][existingIndex].imageURL = imageURL
          }
        })

        // if main key is 'company' and imageURL is provided, update/add imageURL at the main category level
        if (mainKey === "company" && imageURL) {
          globalCategories[language][mainKey].imageURL = imageURL
        }
      })
    })

    console.log("globalCategories after update:", JSON.stringify(globalCategories, null, 2))

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
