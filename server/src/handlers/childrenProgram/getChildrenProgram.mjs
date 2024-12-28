import { ScanCommand } from "@aws-sdk/client-dynamodb"

import { db } from "../../util/db.mjs"

export const getChildrenProgram = async (event) => {
  const { id } = event.pathParameters
  const { language } = event.queryStringParameters

  if (!id || !language) {
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

  try {
    const params = {
      TableName: process.env.CHILDREN_PROGRAMS_TABLE,
      Key: { id },
    }

    const scanCommand = new ScanCommand(params)
    const { Item: program } = await db.send(scanCommand)

    if (!program) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Program not found" }),
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        ...program,
        title: program.title[languageToApply],
        text: program.text[languageToApply],
      }),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error fetching children program" }),
    }
  }
}
