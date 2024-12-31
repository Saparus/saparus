import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"

export const getAllChildrenProgramsForAdmin = async (event) => {
  const { limit, page } = event.queryStringParameters

  if (!limit || !page) {
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
    TableName: process.env.CHILDREN_PROGRAMS_TABLE,
  }

  const scanCommand = new ScanCommand(params)

  try {
    const { Items: programs } = await db.send(scanCommand)

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResult = programs.slice(startIndex, endIndex)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        articles: paginatedResult,
        pagination: {
          currentPage: page,
          hasNextPage: startIndex + limit < translatedPrograms.length,
          totalArticles: translatedPrograms.length,
          totalPages: Math.ceil(translatedPrograms.length / limit),
        },
      }),
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
