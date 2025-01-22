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
  const categories = body.categories || []
  const inStock = body.inStock !== undefined ? Boolean(body.inStock) : false
  const images = body.images || []

  // Validate input
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
      ? await Promise.all(images?.map(async (image) => uploadImage(image, "product")))
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

    console.log(JSON.stringify({ categories }, null, 2))

    const putCommand = new PutCommand(params)
    await db.send(putCommand)

    // Convert input categories to product categories format
    const productCategories = Object.entries(categories || {}).reduce(
      (acc, [language, categoriesForLanguage]) => {
        Object.entries(categoriesForLanguage || {}).forEach(([categoryKey, categoryItem]) => {
          Object.entries(categoryItem || {}).forEach(([key, value]) => {
            if (!acc[categoryKey]) {
              acc[categoryKey] = {
                items: [],
                languages: [],
                categoryKeys: [],
              }
            }

            acc.languages.push(language)
            acc.categoryKeys.push(categoryKey)

            acc[categoryKey].items.push({ key, value })
          })
        })
        return acc
      },
      {
        languages: [],
        categoryKeys: [],
        items: [],
      }
    )

    console.log(JSON.stringify({ productCategories }, null, 2))

    const categoryParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: {
        id: "categories",
      },
    }

    const getCommand = new GetCommand(categoryParams)
    const { Item } = await db.send(getCommand)

    console.log(JSON.stringify({ Item }, null, 2))

    const globalCategories = Item.categories || {}

    console.log(JSON.stringify({ globalCategories }, null, 2))

    // Merge product categories into globalCategories
    Object.entries(categories || {}).forEach(([language, categoriesForLanguage]) => {
      if (!globalCategories[language]) {
        globalCategories[language] = {}
      }

      Object.entries(categoriesForLanguage || {}).forEach(([categoryKey, categoryItem]) => {
        if (!globalCategories[language][categoryKey]) {
          globalCategories[language][categoryKey] = {}
        }

        Object.entries(categoryItem || {}).forEach(([key, value]) => {
          if (!globalCategories[language][categoryKey][key]) {
            globalCategories[language][categoryKey][key] = []
          }

          // Add new value only if it doesn't exist
          const existingItems = globalCategories[language][categoryKey][key]
          if (!existingItems.some((item) => item.name === value.name)) {
            existingItems.push(value)
          }
        })
      })
    })

    console.log(JSON.stringify({ globalCategories }, null, 2))

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
