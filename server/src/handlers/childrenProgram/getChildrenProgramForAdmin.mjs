import { db } from "../../util/db.mjs"

export const getChildrenProgramForAdmin = async (event) => {
  try {
    const { id } = event.pathParameters

    const params = {
      TableName: process.env.CHILDREN_PROGRAMS_TABLE,
      Key: { id },
    }

    const { Item: program } = await db.get(params).promise()

    if (!program) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No items found" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(program),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
}
