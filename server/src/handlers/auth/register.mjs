import { v4 as uuid } from "uuid"
import { bcrypt } from "bcrypt"

import { db } from "../../util/db.mjs"

export const register = async (event) => {
  const { username, password } = JSON.parse(event.body)

  const hashedPassword = await bcrypt.hash(password, 10)

  const params = {
    TableName: process.env.USER_TABLE,
    Item: {
      id: uuid(),
      username: username,
      hashedPassword: hashedPassword,
    },
  }

  try {
    await db.put(params).promise()
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User created successfully" }),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    }
  }
}
