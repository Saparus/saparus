import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"
import { uploadImage } from "../../util/s3.mjs"
import { db } from "../../util/db.mjs"

export const editCategories = async (event) => {
  try {
    const { newCategory, image } = JSON.parse(event.body)

    console.log("Received newCategory:", JSON.stringify(newCategory, null, 2))
    console.log("Received image:", image ? "Yes" : "No")

    let imageURL = null

    // Upload image if exists
    if (image) {
      imageURL = await uploadImage(image, "company_images")
      console.log("Uploaded imageURL:", imageURL)
    }

    // Fetch existing categories from the database
    const getParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: { id: "categories" },
    }

    const { Item } = await db.send(new GetCommand(getParams))
    const existingCategories = Item?.categories || {}

    console.log("Fetched existingCategories:", JSON.stringify(existingCategories, null, 2))

    // Update the new category with the imageURL
    Object.keys(newCategory || {}).forEach((language) => {
      console.log(`Processing language: ${language}`)
      if (!newCategory[language]) {
        console.error(`Missing data for language: ${language}`)
        return
      }

      Object.keys(newCategory[language] || {}).forEach((categoryKey) => {
        console.log(`Processing category: ${categoryKey}`)
        const categoryValue = newCategory[language][categoryKey]
        const subCategoryKey = Object.keys(categoryValue)[0]
        const subCategoryValue = categoryValue[subCategoryKey]

        console.log(`Processing ${language} - ${categoryKey} - ${subCategoryKey}`)

        if (imageURL) {
          subCategoryValue.imageURL = imageURL
          console.log(`Added imageURL to sub-category: ${subCategoryValue.name}`)
        }

        if (!existingCategories[language]) {
          existingCategories[language] = {}
          console.log(`Initialized language in existingCategories: ${language}`)
        }

        if (!existingCategories[language][categoryKey]) {
          existingCategories[language][categoryKey] = []
          console.log(`Initialized category in existingCategories: ${categoryKey}`)
        }

        const exists = existingCategories[language][categoryKey].some(
          (existingSubCategory) => existingSubCategory.name === subCategoryValue.name
        )

        if (!exists) {
          console.log(`Adding new sub-category: ${subCategoryValue.name}`)
          existingCategories[language][categoryKey].push(subCategoryValue)
        } else {
          console.log(`Updating existing sub-category: ${subCategoryValue.name}`)
          // Update existing sub-category with new imageURL if it exists
          existingCategories[language][categoryKey] = existingCategories[language][categoryKey].map(
            (existingSubCategory) =>
              existingSubCategory.name === subCategoryValue.name
                ? { ...existingSubCategory, ...(imageURL && { imageURL }) }
                : existingSubCategory
          )
        }
      })
    })

    console.log("Updated categories:", JSON.stringify(existingCategories, null, 2))

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

    console.log("Categories updated successfully")

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
