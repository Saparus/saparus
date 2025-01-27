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

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    FilterExpression: "#price BETWEEN :minPrice AND :maxPrice AND #type = :type",
    ExpressionAttributeNames: {
      "#price": "price",
      "#type": `categories.${languageToApply}.type.${Object.keys(categories?.type || {})[0]}`,
    },
    ExpressionAttributeValues: {
      ":minPrice": minPrice,
      ":maxPrice": maxPrice,
      ":type": categories?.type[Object.keys(categories?.type || {})[0]],
    },
    Limit: limit,
    ExclusiveStartKey: page > 1 ? { id: `page-${page - 1}` } : undefined,
  }

  try {
    const scanCommand = new ScanCommand(params)
    const { Items: products } = await db.send(scanCommand)

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
