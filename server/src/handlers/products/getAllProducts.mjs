import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

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
  const parsedFilter = filter ? JSON.parse(decodeURIComponent(filter)) : {}
  const { minPrice, maxPrice, categories, name } = parsedFilter

  let filterExpression = []
  let expressionAttributeNames = {}
  let expressionAttributeValues = {}

  if (minPrice !== undefined) {
    filterExpression.push("#price >= :minPrice")
    expressionAttributeValues[":minPrice"] = minPrice
  }

  if (maxPrice !== undefined) {
    filterExpression.push("#price <= :maxPrice")
    expressionAttributeValues[":maxPrice"] = maxPrice
  }

  if (categories && Object.keys(categories).length > 0) {
    Object.keys(categories).forEach((key) => {
      const categoryValue = categories[key]
      if (categoryValue !== "") {
        filterExpression.push(`#${key} = :${key}`)
        expressionAttributeNames[`#${key}`] = `categories.en.${key}.name`
        expressionAttributeValues[`:${key}`] = categoryValue
      }
    })
  }

  if (name) {
    filterExpression.push("contains(#name, :name)")
    expressionAttributeNames["#name"] = `name.${languageToApply}`
    expressionAttributeValues[":name"] = name
  }

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    FilterExpression: filterExpression.length > 0 ? filterExpression.join(" AND ") : undefined,
    ExpressionAttributeNames:
      filterExpression.length > 0 ? { "#price": "price", ...expressionAttributeNames } : undefined,
    ExpressionAttributeValues: filterExpression.length > 0 ? expressionAttributeValues : undefined,
    Limit: parseInt(limit),
    ExclusiveStartKey: page > 1 ? { id: `page-${page - 1}` } : undefined,
  }

  try {
    const { Items: products, LastEvaluatedKey } = await db.send(new ScanCommand(params))

    const paginatedResult = products.map((product) => ({
      ...product,
      name: product.name[languageToApply],
      description: product.description[languageToApply],
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
          hasNextPage: !!LastEvaluatedKey,
          totalProducts: paginatedResult.length,
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
      body: JSON.stringify({ message: "Error fetching products", error }),
    }
  }
}
