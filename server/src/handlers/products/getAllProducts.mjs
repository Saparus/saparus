import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getAllProducts = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2))

  const { filter, language, limit, page } = event.queryStringParameters
  console.log("Parsed query parameters:", { filter, language, limit, page })

  if (!language || !limit || !page) {
    console.error("Missing required fields: language, limit, or page")
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
  console.log("Language to apply:", languageToApply)

  const parsedFilter = filter ? JSON.parse(decodeURIComponent(filter)) : {}
  console.log("Parsed filter:", parsedFilter)

  const { minPrice, maxPrice, categories, name } = parsedFilter
  console.log("Extracted filter values:", { minPrice, maxPrice, categories, name })

  let filterExpression = []
  let expressionAttributeNames = {}
  let expressionAttributeValues = {}

  if (minPrice !== undefined) {
    console.log("Adding minPrice filter:", minPrice)
    filterExpression.push("#price >= :minPrice")
    expressionAttributeValues[":minPrice"] = minPrice
  }

  if (maxPrice !== undefined) {
    console.log("Adding maxPrice filter:", maxPrice)
    filterExpression.push("#price <= :maxPrice")
    expressionAttributeValues[":maxPrice"] = maxPrice
  }

  if (categories && Object.keys(categories).length > 0) {
    console.log("Adding categories filter:", categories)
    Object.keys(categories).forEach((key) => {
      const categoryValue = categories[key]
      if (categoryValue !== "") {
        // Use a simple placeholder for the top-level attribute
        expressionAttributeNames["#categories"] = "categories"
        // Access the nested attribute directly in the FilterExpression
        filterExpression.push(`#categories.en.${key}.${key}.name = :${key}`)
        expressionAttributeValues[`:${key}`] = categoryValue
      }
    })
  }

  if (name) {
    console.log("Adding name filter:", name)
    // Use a simple placeholder for the top-level attribute
    expressionAttributeNames["#name"] = "name"
    // Access the nested attribute directly in the FilterExpression
    filterExpression.push(`contains(#name.${languageToApply}, :name)`)
    expressionAttributeValues[":name"] = name
  }

  console.log("Final filterExpression:", filterExpression.join(" AND "))
  console.log("Final expressionAttributeNames:", expressionAttributeNames)
  console.log("Final expressionAttributeValues:", expressionAttributeValues)

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    FilterExpression: filterExpression.length > 0 ? filterExpression.join(" AND ") : undefined,
    ExpressionAttributeNames:
      filterExpression.length > 0 ? { "#price": "price", ...expressionAttributeNames } : undefined,
    ExpressionAttributeValues: filterExpression.length > 0 ? expressionAttributeValues : undefined,
    Limit: parseInt(limit),
    ExclusiveStartKey: page > 1 ? { id: `page-${page - 1}` } : undefined,
  }

  console.log("DynamoDB ScanCommand params:", JSON.stringify(params, null, 2))

  try {
    const { Items: products, LastEvaluatedKey } = await db.send(new ScanCommand(params))
    console.log("ScanCommand result - Items:", products)
    console.log("ScanCommand result - LastEvaluatedKey:", LastEvaluatedKey)

    const paginatedResult = products.map((product) => ({
      ...product,
      name: product.name[languageToApply],
      description: product.description[languageToApply],
    }))

    console.log("Paginated result:", paginatedResult)

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
    console.error("Error fetching products:", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error fetching products", error: error.message }),
    }
  }
}
