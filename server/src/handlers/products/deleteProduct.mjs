import { DeleteCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const deleteProduct = async (event) => {
  const { id } = event.pathParameters

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    Key: { id },
  }

  const deleteCommand = new DeleteCommand(params)

  try {
    await db.send(deleteCommand)

    return {
      statusCode: 204,
      body: JSON.stringify({ message: "News item deleted successfully" }),
    }
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: error.message }),
    }
  }
}
