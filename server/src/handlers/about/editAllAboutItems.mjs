import { db } from "../../util/db.mjs"

export const editAllAboutItems = authMiddleware(async (event) => {
  const { aboutItems } = JSON.parse(event.body)

  // not implemented

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully updated about page" }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
})
