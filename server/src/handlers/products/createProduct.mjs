import { v4 as uuid } from "uuid"
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"
import { updateGlobalCategories } from "../../util/updateGlobalCategories.mjs"

export const createProduct = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2))

  const body = JSON.parse(event.body)
  console.log("Parsed body:", JSON.stringify(body, null, 2))

  const { name, fixedPrice, price, description, categories = {}, inStock, images = [] } = body

  if (!name) {
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

    // Upload company image if present
    if (categories?.en?.company?.company?.image && categories?.en?.company?.company?.name) {
      const image = categories.en.company.company.image
      imageURL = await uploadImage(
        image,
        "company_images",
        undefined,
        categories.en.company.company.name
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

    const usedLanguages = Object.keys(categories)

    console.log("usedLanguages:", JSON.stringify(usedLanguages, null, 2))
    console.log("categories before adding languages:", JSON.stringify(categories, null, 2))

    if (!usedLanguages.includes("en")) categories.en = {}
    if (!usedLanguages.includes("ka")) categories.ka = {}
    if (!usedLanguages.includes("ru")) categories.ru = {}

    console.log("categories after adding languages:", JSON.stringify(categories, null, 2))
    console.log("usedLanguages:", JSON.stringify(usedLanguages, null, 2))

    Object.keys(categories).forEach((language) => {
      Object.entries(categories[language]).forEach(([key, languageSpecificCategory]) => {
        if (language === "en") return

        if (!languageSpecificCategory.name) {
          categories[language][key] = {}
          categories[language][key][Object.keys(languageSpecificCategory)[0]] = {}
          categories[language][key][Object.keys(languageSpecificCategory)[0]].name =
            categories.en[key][key].name
        }
      })

      console.log("categories after filling:", JSON.stringify(categories, null, 2))

      if (!categories[language].company) return

      Object.keys(categories[language].company).forEach((languageSpecificCompany) => {
        delete categories[language].company[languageSpecificCompany].image

        if (!imageURL) return

        categories[language].company[languageSpecificCompany].imageURL = imageURL
      })
    })

    console.log("Updated categories:", JSON.stringify(categories, null, 2))

    console.log("product name before adding:", JSON.stringify(name, null, 2))

    if (!name.ka) name.ka = name.en
    if (!name.ru) name.ru = name.en

    console.log("product name after adding:", JSON.stringify(name, null, 2))

    console.log("product description before adding", JSON.stringify(name, null, 2))

    if (!description.ka && description.en) description.ka = name.en
    if (!description.ru && description.en) description.ru = name.en

    console.log("product description after adding", JSON.stringify(name, null, 2))

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

    console.log("adding product item:", JSON.stringify(productItem, null, 2))

    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Item: productItem,
    }

    console.log("Product params:", JSON.stringify(params, null, 2))

    // Store product in DynamoDB
    await db.send(new PutCommand(params))
    console.log("Product stored in PRODUCTS_TABLE")

    console.log(
      "adding categories to global table, categories:",
      JSON.stringify(categories, null, 2)
    )

    // Update global categories
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
