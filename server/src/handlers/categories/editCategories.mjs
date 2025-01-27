import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"

import { uploadImage } from "../../util/s3.mjs"
import { db } from "../../util/db.mjs"

export const editCategories = async (event) => {
  try {
    const { categories, addedCategory, image } = JSON.parse(event.body)

    let imageURL = null

    // Upload image if exists
    if (image) {
      imageURL = await uploadImage(image, "company_images", { suffix: "", height: 200 })
    }

    // Fetch existing categories from the database
    const getParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: { id: "categories" },
    }

    const { Item } = await db.send(new GetCommand(getParams))
    const existingCategories = Item?.categories || {}

    const newCategory = { name: addedCategory }
    if (imageURL) {
      newCategory.imageURL = imageURL
    }

    // Update the new categories with the imageURL
    const newCategories = {
      en: {
        company: [...(existingCategories.en?.company || []), newCategory],
      },
      ru: {
        company: [...(existingCategories.ru?.company || []), newCategory],
      },
      ka: {
        company: [...(existingCategories.ka?.company || []), newCategory],
      },
    }

    // Merge new categories with existing categories
    Object.keys(newCategories).forEach((language) => {
      if (!existingCategories[language]) {
        existingCategories[language] = {}
      }

      Object.keys(newCategories[language]).forEach((categoryKey) => {
        if (!existingCategories[language][categoryKey]) {
          existingCategories[language][categoryKey] = []
        }

        newCategories[language][categoryKey].forEach((newCategory) => {
          const exists = existingCategories[language][categoryKey].some(
            (existingCategory) => existingCategory.name === newCategory.name
          )

          if (!exists) {
            existingCategories[language][categoryKey].push(newCategory)
          }
        })
      })
    })

    // Save updated categories to the database
    const params = {
      TableName: process.env.CATEGORIES_TABLE,
      Item: {
        id: "categories",
        categories: existingCategories,
      },
    }

    const putCommand = new PutCommand(params)
    await db.send(putCommand)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Categories updated successfully" }),
    }
  } catch (error) {
    console.error("Error updating categories:", error)

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Failed to update categories" }),
    }
  }
}
