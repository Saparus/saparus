import { v4 as uuid } from "uuid"
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"
import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"

export const createProduct = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2))

  const body = JSON.parse(event.body)
  console.log("Parsed body:", JSON.stringify(body, null, 2))

  const name = body.name
  const fixedPrice = body.fixedPrice ? "true" : "false"
  const price = body.price !== undefined ? Number(body.price) : 0
  const description = body.description
  const categories = body.categories || {}
  const inStock = body.inStock !== undefined ? Boolean(body.inStock) : false
  const images = body.images || []

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
    const imageUrls = images
      ? await Promise.all(
          images.map(async (image) => {
            const url = await uploadImage(image, "product")
            console.log("Uploaded image:", url)
            return url
          })
        )
      : []
    console.log("Image URLs:", JSON.stringify(imageUrls, null, 2))

    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Item: {
        id: uuid(),
        name: name,
        description: description,
        price: price,
        categories: categories,
        fixedPrice: fixedPrice,
        inStock: inStock,
        images: imageUrls,
      },
    }
    console.log("Product params:", JSON.stringify(params, null, 2))

    await db.send(new PutCommand(params))
    console.log("Product stored in PRODUCTS_TABLE")

    const categoryParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: {
        id: "categories",
      },
    }

    const { Item } = await db.send(new GetCommand(categoryParams))
    const globalCategories = Item?.categories || {}
    console.log("Fetched global categories:", JSON.stringify(globalCategories, null, 2))

    // update global categories with new categories or values from the product
    Object.entries(categories).forEach(([language, languageCategories]) => {
      if (!globalCategories[language]) {
        globalCategories[language] = {}
      }

      Object.entries(languageCategories).forEach(async ([categoryKey, categoryValue]) => {
        if (!globalCategories[language][categoryKey]) {
          globalCategories[language][categoryKey] = {}
        }

        Object.entries(categoryValue).forEach(async ([languageSpecificCategory, value]) => {
          if (!globalCategories[language][categoryKey][languageSpecificCategory]) {
            globalCategories[language][categoryKey][languageSpecificCategory] = []
          }

          // check if the category value already exists
          const exists = globalCategories[language][categoryKey][languageSpecificCategory].some(
            (existingItem) => existingItem.name === value.name
          )

          // add new category value if it doesn't exist and is not null
          if (!exists && value) {
            if (categoryKey === "company" && images.length > 0) {
              const newImage = await uploadImage(images[0], "company_images", [
                { suffix: "/s", height: 200 },
              ])

              value.imageURL = newImage
              delete value.image
            }

            globalCategories[language][categoryKey][languageSpecificCategory].push(value)

            console.log(`Added new category value: ${JSON.stringify(value, null, 2)}`)
          }
        })
      })
    })

    console.log("Updated global categories:", JSON.stringify(globalCategories, null, 2))

    const putParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Item: {
        id: "categories",
        categories: globalCategories,
      },
    }

    await db.send(new PutCommand(putParams, { removeUndefinedValues: true }))
    console.log("Updated global categories stored in CATEGORIES_TABLE")

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Product created successfully",
        product: { ...params.Item, images: imageUrls },
      }),
    }
  } catch (error) {
    console.log("Failed to create product", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Failed to create product", error }),
    }
  }
}
