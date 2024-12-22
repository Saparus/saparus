import { ScanCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"

export const getProductForAdmin = async (event) => {
  try {
    const { id } = event.pathParameters

    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Key: { id },
    }

    const scanCommand = new ScanCommand(params)
    const { Item: product } = await db.send(scanCommand)

    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Product not found" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    }
  }
}