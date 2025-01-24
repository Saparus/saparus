import { v4 as uuid } from "uuid"
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"
import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"

export const createProduct = async (event) => {
  const body = JSON.parse(event.body)

  const name = body.name
  const fixedPrice = body.fixedPrice ? "true" : "false"
  const price = body.price !== undefined ? Number(body.price) : 0
  const description = body.description
  const categories = body.categories || {}
  const inStock = body.inStock !== undefined ? Boolean(body.inStock) : false
  const images = body.images || []

  if (!name || !description) {
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
      ? await Promise.all(images.map(async (image) => uploadImage(image, "product")))
      : []

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

    await db.send(new PutCommand(params))

    // fetch current global categories from the CATEGORIES_TABLE
    const categoryParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: {
        id: "categories",
      },
    }

    const { Item } = await db.send(new GetCommand(categoryParams))
    const globalCategories = Item?.categories || {}

    // update global categories with new categories or values from the product
    Object.entries(categories).forEach(([language, languageCategories]) => {
      if (!globalCategories[language]) {
        globalCategories[language] = {}
      }

      Object.entries(languageCategories).forEach(([categoryKey, categoryValue]) => {
        if (!globalCategories[language][categoryKey]) {
          globalCategories[language][categoryKey] = []
        }

        // check if the category value already exists
        const exists = globalCategories[language][categoryKey].some(
          (existingItem) => existingItem.name === categoryValue[categoryKey].name
        )

        // add new category value if it doesn't exist
        if (!exists) {
          globalCategories[language][categoryKey].push(categoryValue[categoryKey])
        }
      })
    })

    const putParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Item: {
        id: "categories",
        categories: globalCategories,
      },
    }

    await db.send(new PutCommand(putParams))

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
