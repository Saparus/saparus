import { uuidv4 as v4 } from "uuid"
import bcrypt from "bcrypt"

import { db } from "../../util/db.mjs"

export const login = async (event) => {
  const { email, password } = JSON.parse(event.body)

  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
      email: email,
    },
  }

  try {
    const { Item: user } = await db.get(params)

    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" })
      return {
        statusCode: 200,
        body: JSON.stringify({ token }),
      }
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      }
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    }
  }
}
