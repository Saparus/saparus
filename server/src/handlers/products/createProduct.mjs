import { v4 as uuid } from "uuid"
import { PutCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"
import { updateGlobalCategories } from "../../util/updateGlobalCategories.mjs"

export const createProduct = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2))

  const body = JSON.parse(event.body)
  console.log("Parsed body:", JSON.stringify(body, null, 2))

  const { name, fixedPrice, price, description, categories = {}, inStock, images = [] } = body

  if (!name || !description) {
    console.log("Validation failed: Missing required fields")
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

    if (categories.find((category) => category.key === "company")?.image) {
      const image = categories.en.company.company.image
      imageURL = await uploadImage(
        image,
        "company_images",
        undefined,
        categories.find((category) => category.key === "company")
      )
      console.log("Company image URL:", imageURL)
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

    console.log("Image URLs:", JSON.stringify(imageUrls, null, 2))

    console.log("Updated categories:", JSON.stringify(categories, null, 2))

    categories.forEach((category) => {
      const { name, value } = category

      if (!name.ka) name.ka = name.en
      if (!name.ru) name.ru = name.en

      if (!value.ka) value.ka = value.en
      if (!value.ru) value.ru = value.en
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
      categories,
      fixedPrice: Boolean(fixedPrice),
      inStock: Boolean(inStock),
      images: imageUrls,
    }

    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Item: productItem,
    }

    console.log("Product params:", JSON.stringify(params, null, 2))

    await db.send(new PutCommand(params))
    console.log("Product stored in PRODUCTS_TABLE")

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
