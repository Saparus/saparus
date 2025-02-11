import { v4 as uuid } from "uuid"
import { PutCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"
import { updateGlobalCategories } from "../../util/updateGlobalCategories.mjs"

export const createProduct = async (event) => {
  const body = JSON.parse(event.body)
  const { name, fixedPrice, price, description, categories = [], inStock, images = [] } = body

  if (!name || !description) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Missing required fields" }),
    }
  }

  try {
    let imageURL

    const companyCategory = categories.find((category) => category && category.image)

    if (companyCategory) {
      imageURL = await uploadImage(
        companyCategory.image,
        "company_images",
        undefined,
        companyCategory.value.en
      )
    }

    const imageUrls = images?.length
      ? await Promise.all(
          images.map(async (image) => {
            if (image.startsWith("http://") || image.startsWith("https://")) {
              return image.replace(/(\/s|\/m|\/o)\.webp$/, "")
            } else {
              return uploadImage(image, "product")
            }
          })
        )
      : []

    categories.forEach((category) => {
      if (category) {
        const { name, value } = category

        if (!name.ka) name.ka = name.en
        if (!name.ru) name.ru = name.en

        if (!value.ka) value.ka = value.en
        if (!value.ru) value.ru = value.en
      }
    })

    if (!name.ka) name.ka = name.en
    if (!name.ru) name.ru = name.en

    if (!description.ka && description.en) description.ka = name.en
    if (!description.ru && description.en) description.ru = name.en

    const productItem = {
      id: uuid(),
      name,
      description,
      price: price !== undefined ? Number(price) : 0,
      categories: categories.map((category) => {
        if (category && category.key === "company") {
          delete category.image
        }
        return category
      }),
      fixedPrice: Boolean(fixedPrice),
      inStock: Boolean(inStock),
      images: imageUrls,
    }

    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Item: productItem,
    }

    await db.send(new PutCommand(params))

    await updateGlobalCategories(categories, imageURL)

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Product created successfully",
        product: productItem,
      }),
    }
  } catch (error) {
    console.error("Failed to create product", error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Failed to create product", error: error.message }),
    }
  }
}
