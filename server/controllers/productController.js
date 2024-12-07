const AWS = require("aws-sdk")
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const filterProducts = require("../util/filterProducts")
const summarizeCategoryData = require("../util/summarizeCategoryData")

const NodeCache = require("node-cache")
const cache = new NodeCache({ stdTTL: 7200, checkperiod: 900 }) // data becomes stale after 2 hours, and every 15 minutes stale data is cleared

// gets all categories by summarizing product data
const getCategories = async (req, res) => {
  try {
    const cacheKey = "categories"

    // checks cache
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
      return res.status(200).json(cachedData)
    }

    const products = await dynamoDb.scan({ TableName: "Products" }).promise()
    const dataToSend = summarizeCategoryData(products.Items)

    // stores in cache
    cache.set(cacheKey, dataToSend)

    res.status(201).json(dataToSend)
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories", details: error })
  }
}

// gets all products (in a passed language) with filtering, pagination, and sorting options
const getProducts = async (req, res) => {
  const { filter, language, limit, page } = req.query
  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  try {
    const cacheKey = `products-${languageToApply}-${page}`

    // checks cache
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
      return res.status(200).json(cachedData)
    }

    const params = {
      TableName: "Products",
    }

    const result = await dynamoDb.scan(params).promise()
    let products = result.Items

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

    // stores in cache
    cache.set(cacheKey, {
      products: paginatedProducts,
      pagination: {
        currentPage: page,
        hasNextPage: endIndex < products.length,
        totalProducts: products.length,
        totalPages: Math.ceil(products.length / limit),
      },
    })

    res.status(200).json({
      products: paginatedProducts,
      pagination: {
        currentPage: page,
        hasNextPage: endIndex < products.length,
        totalProducts: products.length,
        totalPages: Math.ceil(products.length / limit),
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Error fetching products", details: error })
  }
}

// gets single product (in a passed language)
const getProduct = async (req, res) => {
  const { id } = req.params
  const { language } = req.query
  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  try {
    const cacheKey = `product-${id}`

    // checks cache
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
      return res.status(200).json(cachedData)
    }

    const params = {
      TableName: "Products",
      Key: { id: Number(id) },
    }

    const result = await dynamoDb.get(params).promise()

    if (!result.Item) {
      return res.status(404).json({ error: "Product not found" })
    }

    const product = result.Item
    const { name, description } = product

    // stores in cache
    cache.set(cacheKey, {
      ...product,
      name: name[languageToApply],
      description: description[languageToApply],
    })

    res.status(201).json({
      ...product,
      name: name[languageToApply],
      description: description[languageToApply],
    })
  } catch (error) {
    res.status(500).json({ error: "Error fetching product", details: error })
  }
}

// gets single product for editing
// PROTECTED
const getEditProduct = async (req, res) => {
  const { id } = req.params

  try {
    const params = {
      TableName: "Products",
      Key: { id: Number(id) },
    }

    const result = await dynamoDb.get(params).promise()

    if (!result.Item) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.status(201).json(result.Item)
  } catch (error) {
    res.status(500).json({ error: "Error fetching product for editing", details: error })
  }
}

// deletes product
// PROTECTED
const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const params = {
      TableName: "Products",
      Key: { id: Number(id) },
    }

    await dynamoDb.delete(params).promise()

    res.status(201).json({ message: "Product deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Error deleting product", details: error })
  }
}

// adds new product
// PROTECTED
const addProduct = async (req, res) => {
  const { id, name, description, images, inStock, fixedPrice, price, categories } = req.body

  try {
    const params = {
      TableName: "Products",
      Item: { id, name, description, images, inStock, fixedPrice, price, categories },
    }

    await dynamoDb.put(params).promise()

    res.status(201).json({ message: "Product added successfully" })
  } catch (error) {
    res.status(500).json({ error: "Error adding product", details: error })
  }
}

// edits product
// PROTECTED
const editProduct = async (req, res) => {
  const { id, ...updates } = req.body

  try {
    const params = {
      TableName: "Products",
      Key: { id: Number(id) },
      UpdateExpression: `set ${Object.keys(updates)
        .map((key, i) => `#${key} = :val${i}`)
        .join(", ")}`,
      ExpressionAttributeNames: Object.keys(updates).reduce((acc, key) => {
        acc[`#${key}`] = key
        return acc
      }, {}),
      ExpressionAttributeValues: Object.values(updates).reduce((acc, val, i) => {
        acc[`:val${i}`] = val
        return acc
      }, {}),
      ReturnValues: "ALL_NEW",
    }

    const result = await dynamoDb.update(params).promise()

    res.status(201).json(result.Attributes)
  } catch (error) {
    res.status(500).json({ error: "Error editing product", details: error })
  }
}

module.exports = {
  getCategories,
  getProducts,
  getProduct,
  getEditProduct,
  deleteProduct,
  addProduct,
  editProduct,
}
