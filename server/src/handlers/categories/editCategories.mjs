import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"

import { uploadImage } from "../../util/s3.mjs"
import { db } from "../../util/db.mjs"

export const editCategories = async (event) => {
  try {
    const { newCompany, image } = JSON.parse(event.body)

    let imageURL = null

    // Upload image if exists
    if (image) {
      imageURL = await uploadImage(image, "company_images")
    }

    // Fetch existing categories from the database
    const getParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: { id: "categories" },
    }

    const { Item } = await db.send(new GetCommand(getParams))
    const existingCategories = Item?.categories || {}

    // Update the new company category with the imageURL
    Object.keys(newCompany).forEach((language) => {
      if (imageURL) {
        newCompany[language].company.imageURL = imageURL
      }

      if (!existingCategories[language]) {
        existingCategories[language] = {}
      }

      if (!existingCategories[language].company) {
        existingCategories[language].company = []
      }

      const exists = existingCategories[language].company.some(
        (existingCompany) => existingCompany.name === newCompany[language].company.name
      )

      if (!exists) {
        existingCategories[language].company.push(newCompany[language].company)
      } else {
        // Update existing company with new imageURL if it exists
        existingCategories[language].company = existingCategories[language].company.map(
          (existingCompany) =>
            existingCompany.name === newCompany[language].company.name
              ? { ...existingCompany, ...(imageURL && { imageURL }) }
              : existingCompany
        )
      }
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
