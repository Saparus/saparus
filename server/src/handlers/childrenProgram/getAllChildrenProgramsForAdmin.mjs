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

    programs.sort((a, b) => b.date - a.date)

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResult = programs.slice(startIndex, endIndex)

    const filteredPrograms = paginatedResult.map((program) => ({
      ...program,
      images: program.images.map((image) => image + "/m.webp"),
    }))

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        articles: filteredPrograms,
        pagination: {
          currentPage: page,
          hasNextPage: endIndex < programs.length,
          totalArticles: programs.length,
          totalPages: Math.ceil(programs.length / limit),
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
