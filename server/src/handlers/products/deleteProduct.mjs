import { DeleteItemCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"

export const deleteProduct = async (event) => {
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

  const deleteItemCommand = new DeleteItemCommand(params)

  try {
    await db.send(deleteItemCommand)

    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Product item deleted successfully" }),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error deleting product item", error }),
    }
  }
}
