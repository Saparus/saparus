import { GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getProduct = async (event) => {
  const { language } = event.queryStringParameters
  const { id } = event.pathParameters

  console.log({ id, language })

  if (!language || !id) {
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
    Key: { id },
  }

  const getCommand = new GetCommand(params)

  try {
    const { Item: product } = await db.send(getCommand)

    console.log(product)

    if (!product) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Product not found" }),
      }
    }

    const { name, description } = product

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        ...product,
        name: name[languageToApply],
        description: description[languageToApply],
      }),
    }
  } catch (error) {
    console.error("Error fetching product", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error fetching product" }),
    }
  }
}
