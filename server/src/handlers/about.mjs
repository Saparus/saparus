import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb"
import { uuidv4 } from "uuid"

import { authMiddleware } from "../middleware/authMiddleware.mjs"
import { filterProducts } from "../util/filter"
import { summarizeCategoryData } from "../util/summarizeCategoryData"

const client = new DynamoDBClient({})

const dynamoDB = DynamoDBDocumentClient.from(client)

const tableName = "about"

// GET /about
export const getAllAboutItems = async (event) => {
  const { language } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const params = {
    TableName: tableName,
  }

  try {
    const data = await dynamoDB.send(new ScanCommand(params))

    const itemsToReturn = data.Items.map((aboutItem) => {
      const { title, text } = aboutItem
      return { ...aboutItem, title: title[languageToApply], text: text[languageToApply] }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(itemsToReturn),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
}

// GET /about/edit
export const getAllEditAboutItems = async () => {
  const params = {
    TableName: tableName,
  }

  try {
    const data = await dynamoDB.send(new ScanCommand(params))
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
}

// PROTECTED
// PATCH /about
export const editAllAboutItems = authMiddleware(async (event) => {
  const { aboutItems } = JSON.parse(event.body)

  const updatePromises = aboutItems.map((item) => {
    const params = {
      TableName: tableName,
      Key: { id: item.id },
      UpdateExpression: "SET #title = :title, #text = :text",
      ExpressionAttributeNames: {
        "#title": "title",
        "#text": "text",
      },
      ExpressionAttributeValues: {
        ":title": item.title,
        ":text": item.text,
      },
    }
    return dynamoDB.send(new UpdateCommand(params))
  })

  try {
    await Promise.all(updatePromises)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "All About items updated successfully" }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
})
