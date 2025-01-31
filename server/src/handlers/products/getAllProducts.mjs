import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { filterProducts } from "../../util/filterProducts.mjs"

export const getAllProducts = async (event) => {
  const { filter, language, limit, page } = event.queryStringParameters

  if (!language || !limit || !page) {
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

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
  }

  const scanCommand = new ScanCommand(params)
  const { Items: products } = await db.send(scanCommand)

  let productsToSend = []

  try {
    const parsedFilter = filter ? JSON.parse(decodeURIComponent(filter)) : {}
    const isEmptyFilter = Object.keys(parsedFilter).length === 0

    if (filter || !isEmptyFilter) {
      const { minPrice, maxPrice, ...otherFilters } = parsedFilter

      const cleanedCategories = categories ? removeEmptyValues(categories) : {}

      productsToSend = filterProducts(
        products,
        { ...otherFilters, categories: cleanedCategories },
        languageToApply
      )

      // if (minPrice || maxPrice) {
      //   productsToSend = productsToSend.filter((product) => {
      //     const price = product.price
      //     return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice)
      //   })
      // }
      if (minPrice || maxPrice) {
        // find the maximum price among all products
        const maxPossiblePrice = Math.max(...products.map((product) => product.price || 0))

        productsToSend = productsToSend.filter((product) => {
          const price = product.price

          // include products without a fixed price if minPrice is 0 and maxPrice is the maximum possible price
          if (price === null || price === undefined || price === 0 || price === "") {
            return minPrice === 0 && maxPrice === maxPossiblePrice
          }

          // apply price range filtering
          return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice)
        })
      }
    } else {
      productsToSend = products.map((product) => ({
        ...product,
        name: product.name[languageToApply],
        description: product.description[languageToApply],
      }))
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResult = productsToSend.slice(startIndex, endIndex).map((productToSend) => ({
      ...productToSend,
      images: productToSend.images.map((image) => image),
    }))

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
