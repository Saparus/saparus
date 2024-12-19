import { db } from "../../util/db.mjs"

export const getProduct = async (event) => {
  try {
    const { language } = event.queryStringParameters
    const { id } = event.pathParameters

    const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Key: { id },
    }

    const { Item: product } = await db.get(params).promise()

    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Product not found" }),
      }
    }

    const { title, text } = product

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...product,
        title: title[languageToApply],
        text: text[languageToApply],
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching product" }),
    }
  }
}
