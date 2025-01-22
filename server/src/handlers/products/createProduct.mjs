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

            acc[categoryKey].items.push(key)
            acc[categoryKey].items.push(value)
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

    Object.entries(globalCategories.categories || {}).forEach(
      ([language, globalCategoriesForLanguage]) => {
        Object.entries(globalCategoriesForLanguage || {}).forEach(
          ([categoryKey, categoryItem], index) => {
            if (!productCategories.categoryKeys.includes(categoryKey)) {
              // if a product with a category that does not exist in the global categories list was created, this category will be added to it
              globalCategories[language][categoryKey] = {
                [productCategories[index].items.key]: productCategories[index].items.value,
              }
            } else {
              // if a product with a category that exists in the global categories list was created
              if (
                !globalCategories[language][categoryKey][productCategories[index].items.key].some(
                  (item) => item.name === productCategories[index].items.value.name
                )
              ) {
                // if a newly created product has a value that does not exist in the global categories list, it will add this value to it
                globalCategories[language][categoryKey][productCategories[index].items.key].push(
                  productCategories[index].items.value
                )
              }
            }
          }
        )
      }
    )

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
