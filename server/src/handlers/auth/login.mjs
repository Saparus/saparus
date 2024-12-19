import { uuidv4 as v4 } from "uuid"
import { bcrypt } from "bcrypt"

import { db } from "../../util/db.mjs"

export const login = async (event) => {
  const { username, password } = JSON.parse(event.body)

  const params = {
    TableName: process.env.user_table,
    Key: {
      username: username,
    },
  }

  try {
    const data = await db.get(params)
    const user = data.Item

    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" })
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
