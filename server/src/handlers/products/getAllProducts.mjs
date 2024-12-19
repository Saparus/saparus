import { db } from "../../util/db.mjs"
import { filterProducts } from "../../util/filter"

export const getAllNewsItems = async (event) => {
  const { language, limit, page } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  try {
    const params = {
      TableName: process.env.PRODUCTS_TABLE,
    }

    const { Items: products } = await db.scan(params).promise()

    const translatedProducts = products.map((newsItem) => {
      const tempNewsItem = { ...newsItem }
      tempNewsItem.text = newsItem.text[languageToApply]
      tempNewsItem.title = newsItem.title[languageToApply]

      return tempNewsItem
    })

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
      body: JSON.stringify({ message: "Error fetching programs" }),
    }
  }
}
