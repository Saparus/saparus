import { db } from "../../util/db.mjs"

export const getAllChildrenProgramsForAdmin = async (event) => {
  try {
    const params = {
      TableName: process.env.children_program_table,
    }

    const result = await db.scan(params).promise()

    if (!result.Items || result.Items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No items found" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    }
  }
}
