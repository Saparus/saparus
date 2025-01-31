import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { filterProducts } from "../../util/filterProducts.mjs"

export const getAllProducts = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2))

  const { filter, language, limit, page } = event.queryStringParameters

  if (!language || !limit || !page) {
    console.log("Missing required fields in query parameters")
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"
  console.log("Using language:", languageToApply)

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
  }

  console.log("DynamoDB scan params:", JSON.stringify(params, null, 2))
  const scanCommand = new ScanCommand(params)
  const { Items: products } = await db.send(scanCommand)
  console.log("Fetched products:", JSON.stringify(products, null, 2))

  let productsToSend = []

  try {
    const parsedFilter = filter ? JSON.parse(decodeURIComponent(filter)) : {}
    console.log("Parsed filter:", JSON.stringify(parsedFilter, null, 2))

    const isEmptyFilter = Object.keys(parsedFilter).length === 0

    if (filter || !isEmptyFilter) {
      const { minPrice, maxPrice, ...otherFilters } = parsedFilter
      console.log(
        "Extracted filter values:",
        JSON.stringify({ minPrice, maxPrice, otherFilters }, null, 2)
      )

      const cleanedCategories = filter.categories ? removeEmptyValues(filter.categories) : {}
      console.log("Cleaned categories:", JSON.stringify(cleanedCategories, null, 2))

      productsToSend = filterProducts(
        products,
        { ...otherFilters, categories: cleanedCategories },
        languageToApply
      )

      console.log("Products after filtering:", JSON.stringify(productsToSend, null, 2))

      if (minPrice || maxPrice) {
        const maxPossiblePrice = Math.max(...products.map((product) => product.price || 0))
        console.log("Max possible price:", maxPossiblePrice)

        productsToSend = productsToSend.filter((product) => {
          const price = product.price

          if (price === null || price === undefined || price === 0 || price === "") {
            return minPrice === 0 && maxPrice === maxPossiblePrice
          }

          return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice)
        })

        console.log("Products after price filtering:", JSON.stringify(productsToSend, null, 2))
      }
    } else {
      productsToSend = products.map((product) => ({
        ...product,
        name: product.name[languageToApply],
        description: product.description[languageToApply],
      }))
      console.log("Products mapped with language fields:", JSON.stringify(productsToSend, null, 2))
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    console.log("Pagination indices:", { startIndex, endIndex })

    const paginatedResult = productsToSend.slice(startIndex, endIndex).map((productToSend) => ({
      ...productToSend,
      images: productToSend.images.map((image) => image),
    }))

    console.log("Paginated result:", JSON.stringify(paginatedResult, null, 2))

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        products: paginatedResult,
        pagination: {
          currentPage: page,
          hasNextPage: endIndex < products.length,
          totalProducts: products.length,
          totalPages: Math.ceil(products.length / limit),
        },
      }),
    }
  } catch (error) {
    console.error("Error fetching products", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error fetching products" }),
    }
  }
}

const removeEmptyValues = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  )
}
