import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getAllChildrenProgramsForAdmin = async (event) => {
  const params = {
    TableName: process.env.CHILDREN_PROGRAMS_TABLE,
  }

  const scanCommand = new ScanCommand(params)

  try {
    const { Items: programs } = await db.send(scanCommand)

    if (!programs || programs.length === 0) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Children programs not found" }),
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(programs),
    }
  } catch (error) {
    console.error("Error fetching children programs", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error fetching children programs", error }),
    }
  }
}
