import { db } from "../../util/db.mjs"

export const getAllChildrenProgramsForAdmin = async (event) => {
  try {
    const params = {
      TableName: process.env.CHILDREN_PROGRAMS_TABLE,
    }

    const { Items: programs } = await db.scan(params).promise()

    if (!programs || programs.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No items found" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(programs),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    }
  }
}
