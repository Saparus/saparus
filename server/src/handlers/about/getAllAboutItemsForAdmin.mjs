import { ScanCommand } from "@aws-sdk/lib-dynamodb"
import { db } from "../../util/db.mjs"

export const getAllAboutItemsForAdmin = async (event) => {
  const params = {
    TableName: process.env.ABOUT_TABLE,
  }

  const scanCommand = new ScanCommand(params)

  try {
    const { Items: aboutItems } = await db.send(scanCommand)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(aboutItems),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
}
