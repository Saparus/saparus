import { ScanCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"
import { filterProducts } from "../../util/filterProducts.mjs"

export const getAllNewsItems = async (event) => {
  const { language = "en", limit = 10, page = 1 } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
  }

  const scanCommand = new ScanCommand(params)
  const { Items: products } = await db.send(scanCommand)

  const translatedProducts = products.map((newsItem) => {
    const tempNewsItem = { ...newsItem }
    tempNewsItem.text = newsItem.text[languageToApply]
    tempNewsItem.title = newsItem.title[languageToApply]

    return tempNewsItem
  })

  try {
    if (filter) {
      const parsedFilter = JSON.parse(decodeURIComponent(filter))
      const { minPrice, maxPrice, ...otherFilters } = parsedFilter

      products = filterProducts(translatedProducts, otherFilters, languageToApply)

      if (minPrice || maxPrice) {
        products = products.filter((product) => {
          const price = product.price
          return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice)
        })
      }
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResult = products.slice(startIndex, endIndex)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,GET",
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
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,GET",
      },
      body: JSON.stringify({ message: "Error fetching programs" }),
    }
  }
}
