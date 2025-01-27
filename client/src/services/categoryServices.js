import ajax from "./ajax"

// get all categories
export const getCategories = async () => {
  try {
    const { data } = await ajax.get(`/categories`)

    return data
  } catch (error) {
    console.error("error fetching categories:", error)
    throw error
  }
}

// change all categories to the passed categories
export const editCategories = async (categories, addedCategory, image, api_key) => {
  if (!api_key) {
    console.error("API key is required")
    return
  }

  try {
    const response = await ajax.post(`/categories?api_key=${api_key}`, {
      categories,
      addedCategory,
      image,
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error editing categories:", error)
    throw error
  }
}

export const getCompanies = async () => {
  try {
    const { data } = await ajax.get(`/categories/companies`)

    return data
  } catch (error) {
    console.error("error fetching categories:", error)
    throw error
  }
}
