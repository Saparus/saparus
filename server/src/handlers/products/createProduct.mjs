import { v4 as uuid } from "uuid"
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"
import { updateGlobalCategories } from "../../util/updateGlobalCategories.mjs"

export const createProduct = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2))

  const body = JSON.parse(event.body)
  console.log("Parsed body:", JSON.stringify(body, null, 2))

  const { name, fixedPrice, price, description, categories = {}, inStock, images = [] } = body

  if (!name || !description) {
    console.log("Validation failed: Missing required fields")
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  try {
    let imageURL

    // Upload company image if present
    if (categories?.en?.company?.company?.image && categories?.en?.company?.company?.name) {
      const image = categories.en.company.company.image
      imageURL = await uploadImage(
        image,
        "company_images",
        undefined,
        categories.en.company.company.name
      )
      console.log("Company image URL:", imageURL)
    }

    const imageUrls = images?.length
      ? await Promise.all(
          images.map(async (image) => {
            if (image.startsWith("http://") || image.startsWith("https://")) {
              return image.replace(/(\/s|\/m|\/o)\.webp$/, "")
            } else {
              return uploadImage(image, "product")
            }
          })
        )
      : []

    console.log("Image URLs:", JSON.stringify(imageUrls, null, 2))

    Object.keys(categories).forEach((language) => {
      if (!categories[language].company) return

      Object.keys(categories[language].company).forEach((languageSpecificCompany) => {
        delete categories[language].company[languageSpecificCompany].image

        if (!imageURL) return

        categories[language].company[languageSpecificCompany].imageURL = imageURL
      })
    })

    console.log("Updated categories:", JSON.stringify(categories, null, 2))

    // Prepare product item for DynamoDB
    const productItem = {
      id: uuid(),
      name,
      description,
      price: price !== undefined ? Number(price) : 0,
      categories,
      fixedPrice: Boolean(fixedPrice),
      inStock: Boolean(inStock),
      images: imageUrls,
    }

    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Item: productItem,
    }

    console.log("Product params:", JSON.stringify(params, null, 2))

    // Store product in DynamoDB
    await db.send(new PutCommand(params))
    console.log("Product stored in PRODUCTS_TABLE")

    // Update global categories
    await updateGlobalCategories(categories, imageURL)

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Product created successfully",
        product: productItem,
      }),
    }
  } catch (error) {
    console.error("Failed to create product", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Failed to create product", error: error.message }),
    }
  }
}
