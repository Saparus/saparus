import { GetItemCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"

export const getProduct = async (event) => {
  const { language } = event.queryStringParameters
  const { id } = event.pathParameters

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

  const getItemCommand = new GetItemCommand(params)

  try {
    const { Item: product } = await db.send(getItemCommand)

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

    const { title, text } = product

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        ...product,
        title: title[languageToApply],
        text: text[languageToApply],
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
