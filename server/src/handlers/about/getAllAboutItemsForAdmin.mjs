import { db } from "../../util/db.mjs"

export const getAllAboutItemsForAdmin = async (event) => {
  const params = {
    TableName: process.env.ABOUT_TABLE,
  }

  try {
    const { Items: aboutItems } = await db.scan(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(aboutItems),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
}
