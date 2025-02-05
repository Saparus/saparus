import { GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getProductForAdmin = async (event) => {
  const { id } = event.pathParameters

  if (!id) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    Key: { id },
  }

  const getCommand = new GetCommand(params)

  try {
    const { Item: product } = await db.send(getCommand)

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

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        ...product,
        images: product.images.map((image) => image + "/o.webp"),
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
      body: JSON.stringify({ message: "Error fetching products", error }),
    }
  }
}
