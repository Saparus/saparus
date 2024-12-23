import { ScanCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"

export const getChildrenProgramForAdmin = async (event) => {
  const { id } = event.pathParameters

  if (!id) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,PATCH",
      },
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  const params = {
    TableName: process.env.CHILDREN_PROGRAMS_TABLE,
    Key: { id },
  }

  const scanCommand = new ScanCommand(params)
  try {
    const { Item: program } = await db.send(scanCommand)

    if (!program) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": process.env.CLIENT_URL,
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE",
        },
        body: JSON.stringify({ message: "No items found" }),
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE",
      },
      body: JSON.stringify(program),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": process.env.CLIENT_URL,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE",
      },
      body: JSON.stringify({ message: "Internal server error", error }),
    }
  }
}
