import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb"
import { db } from "../../util/db.mjs"

export const getCompanies = async (event) => {
  try {
    const categoryParams = {
      TableName: process.env.CATEGORIES_TABLE,
      Key: {
        id: "categories",
      },
    }

    const getCommand = new GetCommand(categoryParams)
    const { Item } = await db.send(getCommand)

    const categories = Item?.categories

    if (!categories) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Categories not found" }),
      }
    }

    const productParams = {
      TableName: process.env.PRODUCTS_TABLE,
    }

    const scanCommand = new ScanCommand(productParams)
    const { Items: products } = await db.send(scanCommand)

    const companiesWithProducts = new Set()
    products.forEach((product) => {
      const company = product.categories?.en?.company?.company?.name
      if (company) {
        companiesWithProducts.add(company)
      }
    })

    const companies = {}
    Object.keys(categories).forEach((language) => {
      if (categories[language].company) {
        companies[language] = []
        categories[language].company.company.forEach((company) => {
          if (companiesWithProducts.has(company.name)) {
            companies[language].push(company)
          }
        })
      }
    })

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(companies),
    }
  } catch (error) {
    console.error("Error fetching companies:", error)

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Failed to fetch companies" }),
    }
  }
}
