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

const tableName = "products"

// PROTECTED
// POST /products
export const addProduct = authMiddleware(async (event) => {
  const body = JSON.parse(event.body)

  await dynamoDB.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        id: uuidv4(),
        name: body.name,
        fixedPrice: body.fixedPrice,
        price: body.price,
        description: body.description,
        categories: body.categories,
        inStock: body.inStock,
        images: body.images,
      },
    })
  )

  return {
    statusCode: 201,
    body: JSON.stringify({ message: "Product added successfully" }),
  }
})

// PROTECTED
// PATCH /products/${id}
export const updateProduct = authMiddleware(async (event) => {
  const productId = event.pathParameters.id
  const body = JSON.parse(event.body)

  const params = {
    TableName: tableName,
    Key: {
      id: productId,
    },
    UpdateExpression:
      "SET #name = :name, #description = :description, #fixedPrice = :fixedPrice, #categories = :categories, #inStock = :inStock, #images = :images",
    ExpressionAttributeNames: {
      "#name": "name",
      "#description": "description",
      "#fixedPrice": "fixedPrice",
      "#categories": "categories",
      "#inStock": "inStock",
      "#images": "images",
    },
    ExpressionAttributeValues: {
      ":name": body.name,
      ":description": body.description,
      ":fixedPrice": body.fixedPrice,
      ":categories": body.categories,
      ":inStock": body.inStock,
      ":images": body.images,
    },
  }

  try {
    await dynamoDB.send(new UpdateCommand(params))
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Product updated successfully" }),
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
// DELETE /products/${id}
export const deleteProduct = authMiddleware(async (event) => {
  const productId = event.pathParameters.id

  const params = {
    TableName: tableName,
    Key: {
      id: productId,
    },
  }

  try {
    await dynamoDB.send(new DeleteCommand(params))
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Product deleted successfully" }),
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
// GET /products/edit/${id}
export const getEditProduct = authMiddleware(async (event) => {
  const productId = event.pathParameters.id

  const params = {
    TableName: tableName,
    Key: {
      id: productId,
    },
  }

  try {
    const data = await dynamoDB.send(new GetCommand(params))

    if (!data.Item) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.status(201).json(result.Item)

    return {
      statusCode: 200,
      body: JSON.stringify({ ...data.Item }),
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching product for editing", details: error })
  }
})

// GET /products/${id}
export const getProduct = async (event) => {
  const productId = event.pathParameters.id
  const { language } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const params = {
    TableName: tableName,
    Key: {
      id: productId,
    },
  }

  try {
    const data = await dynamoDB.send(new GetCommand(params))

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Product not found" }),
      }
    }

    const product = data.Item
    const { name, description } = product

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...data.Item,
        name: name[languageToApply],
        description: description[languageToApply],
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

// GET /products
export const getProducts = async (event) => {
  const { language } = event.queryStringParameters

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const params = {
    TableName: tableName,
  }

  try {
    const data = await dynamoDB.send(new ScanCommand(params))

    let products = data.Items

    if (filter) {
      const parsedFilter = JSON.parse(decodeURIComponent(filter))
      const { minPrice, maxPrice, ...otherFilters } = parsedFilter

      products = filterProducts(products, otherFilters, languageToApply)

      if (minPrice || maxPrice) {
        products = products.filter((product) => {
          const price = product.price
          return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice)
        })
      }
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = products.slice(startIndex, endIndex)

    return {
      statusCode: 200,
      body: JSON.stringify({
        products: paginatedProducts,
        pagination: {
          currentPage: page,
          hasNextPage: endIndex < products.length,
          totalProducts: products.length,
          totalPages: Math.ceil(products.length / limit),
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

// GET /products/categories
export const getCategories = async (event) => {
  const params = {
    TableName: tableName,
  }

  try {
    const data = await dynamoDB.scan(new ScanCommand(params))
    const categories = summarizeCategoryData(data.Items)

    return {
      statusCode: 200,
      body: JSON.stringify(categories),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
}
