import { db } from "../../util/db.mjs"
import { DeleteCommand } from "@aws-sdk/lib-dynamodb"

export const deleteChildrenProgram = async (event) => {
  const { id } = event.pathParameters

  const params = {
    TableName: process.env.CHILDREN_PROGRAMS_TABLE,
    Key: { id },
  }

  const deleteCommand = new DeleteCommand(params)

  try {
    await db.send(deleteCommand)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Children program deleted successfully" }),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    }
  }
}
