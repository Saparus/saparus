import { PutCommand } from "@aws-sdk/lib-dynamodb"

import { uploadImage } from "../../util/s3.mjs"

export const editCategories = async (event) => {
  try {
    const { categories } = JSON.parse(event.body)

    // Extract image from categories
    const image =
      categories.en?.company?.company?.image ||
      categories.ka?.company?.კომპანია?.image ||
      categories.ru?.company?.компания?.image

    let imageURL = null

    // Upload image if exists
    if (image) {
      imageURL = await uploadImage(image, "company_images")

      // Replace image field with imageURL across all language categories
      categories.en.company.company.imageURL = imageURL
      categories.ka.company.კომპანია.imageURL = imageURL
      categories.ru.company.компания.imageURL = imageURL

      delete categories.en.company.company.image
      delete categories.ka.company.კომპანია.image
      delete categories.ru.company.компания.image
    }

    const params = {
      TableName: process.env.CATEGORIES_TABLE,
      Item: {
        id: "categories",
        categories: categories,
      },
    }

    const putCommand = new PutCommand(params)
    await db.send(putCommand)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Categories updated successfully" }),
    }
  } catch (error) {
    console.error("Error updating categories:", error)

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to update categories" }),
    }
  }
}
