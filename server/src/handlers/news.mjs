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

const client = new DynamoDBClient({})
const dynamoDB = DynamoDBDocumentClient.from(client)
const tableName = "news"

// GET /news
export const getAllNewsArticles = async (event) => {
  const { language, limit, page } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const params = {
    TableName: tableName,
  }

  try {
    const data = await dynamoDB.send(new ScanCommand(params))

    let newsToSend = data.Items.map((newsItem) => {
      const tempNewsItem = { ...newsItem }
      tempNewsItem.text = newsItem.text[languageToApply]
      tempNewsItem.title = newsItem.title[languageToApply]

      return tempNewsItem
    })

    newsToSend.sort((a, b) => a.date - b.date)

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedNewsArticles = newsToSend.slice(startIndex, endIndex)

    return {
      statusCode: 200,
      body: JSON.stringify({
        articles: paginatedNewsArticles,
        pagination: {
          currentPage: page,
          hasNextPage: endIndex < newsToSend.length,
          totalNewsArticles: newsToSend.length,
          totalPages: Math.ceil(newsToSend.length / limit),
        },
      }),
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
// GET /news/edit
export const getEditNewsArticles = authMiddleware(async (event) => {
  const { limit, page } = event.queryStringParameters

  const params = {
    TableName: tableName,
  }

  try {
    const data = await dynamoDB.send(new ScanCommand(params))

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedNewsArticles = data.Items.slice(startIndex, endIndex)

    return {
      statusCode: 200,
      body: JSON.stringify({
        articles: paginatedNewsArticles,
        pagination: {
          currentPage: page,
          hasNextPage: endIndex < data.Items.length,
          totalNewsArticles: data.Items.length,
          totalPages: Math.ceil(data.Items.length / limit),
        },
      }),
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
// GET /news/edit/:id
export const getEditSingleNewsArticle = authMiddleware(async (event) => {
  const { id } = event.pathParameters

  const params = {
    TableName: tableName,
    Key: {
      id,
    },
  }

  try {
    const data = await dynamoDB.send(new GetCommand(params))

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "News article not found" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
})

// GET /news/:id
export const getSingleNewsArticle = async (event) => {
  const { language } = event.queryStringParameters
  const { id } = event.pathParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const params = {
    TableName: tableName,
    Key: {
      id,
    },
  }

  try {
    const data = await dynamoDB.send(new GetCommand(params))

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "News article not found" }),
      }
    }

    const { title, text } = data.Item

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...data.Item,
        title: title[languageToApply],
        text: text[languageToApply],
      }),
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
// POST /news
export const postNewsArticle = authMiddleware(async (event) => {
  const body = JSON.parse(event.body)

  const newItem = {
    id: uuidv4(),
    title: body.title,
    text: body.text,
    images: body.images,
    date: new Date().toISOString(),
  }

  try {
    await dynamoDB.send(
      new PutCommand({
        TableName: tableName,
        Item: newItem,
      })
    )

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "News article created successfully" }),
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
// PATCH /news/:id
export const editNewsArticle = authMiddleware(async (event) => {
  const { id } = event.pathParameters
  const body = JSON.parse(event.body)

  const params = {
    TableName: tableName,
    Key: {
      id,
    },
    UpdateExpression: "SET #title = :title, #text = :text, #images = :images",
    ExpressionAttributeNames: {
      "#title": "title",
      "#text": "text",
      "#images": "images",
    },
    ExpressionAttributeValues: {
      ":title": body.title,
      ":text": body.text,
      ":images": body.images,
    },
  }

  try {
    await dynamoDB.send(new UpdateCommand(params))
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "News article updated successfully" }),
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
// DELETE /news/:id
export const deleteNewsArticle = authMiddleware(async (event) => {
  const { id } = event.pathParameters

  const params = {
    TableName: tableName,
    Key: {
      id,
    },
  }

  try {
    await dynamoDB.send(new DeleteCommand(params))
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "News article deleted successfully" }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
})
