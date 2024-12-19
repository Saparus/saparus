import { db } from "../../util/db.mjs"

export const getEditAboutItems = async (event) => {
  const params = {
    TableName: process.env.about_table,
  }

  // not implemented

  try {
    return {
      statusCode: 200,
      body: JSON.stringify("not implemented"),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
}
