import { authMiddleware } from "../middleware/authMiddleware.mjs"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  ScanCommand,
  QueryCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb"
import { v4 as uuidv4 } from "uuid"

const client = new DynamoDBClient({})

const dynamoDB = DynamoDBDocumentClient.from(client)

const tableName = "childrenProgram"

// GET /childrenProgram
export const getAllChildrenProgramArticles = async (event) => {
  const { language, limit, page } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const params = {
    TableName: tableName,
  }

  try {
    const data = await dynamoDB.send(new ScanCommand(params))

    const articles = data.Items.map((article) => ({
      ...article,
      text: article.text[languageToApply],
      title: article.title[languageToApply],
    }))

    articles.sort((a, b) => a.date - b.date)

    const startIndex = (page - 1) * limit
    const paginatedArticles = articles.slice(startIndex, startIndex + limit)

    const dataToSend = {
      articles: paginatedArticles,
      pagination: {
        currentPage: page,
        hasNextPage: startIndex + limit < articles.length,
        totalArticles: articles.length,
        totalPages: Math.ceil(articles.length / limit),
      },
    }

    return {
      statusCode: 200,
      body: JSON.stringify(dataToSend),
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
// GET /childrenProgram/edit
export const getEditChildrenProgramArticles = authMiddleware(async (event) => {
  const { limit, page } = event.queryStringParameters

  const params = {
    TableName: tableName,
  }

  try {
    const data = await dynamoDB.send(new ScanCommand(params))

    const startIndex = (page - 1) * limit
    const paginatedArticles = data.Items.slice(startIndex, startIndex + limit)

    const dataToSend = {
      articles: paginatedArticles,
      pagination: {
        currentPage: page,
        hasNextPage: startIndex + limit < data.Items.length,
        totalArticles: data.Items.length,
        totalPages: Math.ceil(data.Items.length / limit),
      },
    }

    return {
      statusCode: 200,
      body: JSON.stringify(dataToSend),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
})

// PROTECTED
// GET /childrenProgram/edit/:id
export const getEditSingleChildrenProgramArticle = authMiddleware(async (event) => {
  const { id } = event.pathParameters

  const params = {
    TableName: tableName,
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id,
    },
  }

  try {
    const data = await dynamoDB.send(new QueryCommand(params))
    const article = data.Items[0]

    if (!article) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Children program article not found" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(article),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
})

// GET /childrenProgram/:id
export const getSingleChildrenProgramArticle = async (event) => {
  const { language } = event.queryStringParameters
  const { id } = event.pathParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const params = {
    TableName: tableName,
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id,
    },
  }

  try {
    const data = await dynamoDB.send(new QueryCommand(params))
    const article = data.Items[0]

    if (!article) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Children program article not found" }),
      }
    }

    const { title, text } = article

    const dataToSend = {
      ...article,
      title: title[languageToApply],
      text: text[languageToApply],
    }

    return {
      statusCode: 200,
      body: JSON.stringify(dataToSend),
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
// POST /childrenProgram
export const postChildrenProgramArticle = authMiddleware(async (event) => {
  const { title, text, images } = JSON.parse(event.body)

  const params = {
    TableName: tableName,
    Item: {
      id: uuidv4(),
      title,
      text,
      images,
    },
  }

  try {
    await dynamoDB.send(new PutCommand(params))
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Post children program article" }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
})

// PROTECTED
// PATCH /childrenProgram/:id
export const editChildrenProgramArticle = authMiddleware(async (event) => {
  const { id } = event.pathParameters
  const { title, text, images } = JSON.parse(event.body)

  const params = {
    TableName: tableName,
    Key: { id },
    UpdateExpression: "SET #title = :title, #text = :text, #images = :images",
    ExpressionAttributeNames: {
      "#title": "title",
      "#text": "text",
      "#images": "images",
    },
    ExpressionAttributeValues: {
      ":title": title,
      ":text": text,
      ":images": images,
    },
  }

  try {
    await dynamoDB.send(new UpdateCommand(params))
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Edit children program article" }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
})

// PROTECTED
// DELETE /childrenProgram/:id
export const deleteChildrenProgramArticle = authMiddleware(async (event) => {
  const { id } = event.pathParameters

  const params = {
    TableName: tableName,
    Key: { id },
  }

  try {
    await dynamoDB.send(new DeleteCommand(params))
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Delete children program article" }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
})
