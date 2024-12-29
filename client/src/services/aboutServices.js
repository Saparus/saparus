import ajax from "./ajax"

// get all about items by language
export const getAllAboutItems = async (language) => {
  try {
    const { data } = await ajax.get(`/about?language=${language}`)
    return data
  } catch (error) {
    console.error("error fetching all about items:", error)
    throw error
  }
}

// get all about items for editing (requires api_key)
export const getAllEditAboutItems = async (api_key) => {
  try {
    const { data } = await ajax.get(`/about/admin?api_key=${api_key}`)
    return data
  } catch (error) {
    console.error("error fetching about items for editing:", error)
    throw error
  }
}

// edit all about items (requires api_ key)
export const editAllAboutItems = async (aboutItems, api_key) => {
  try {
    const { data } = await ajax.patch(`/about?api_key=${api_key}`, { aboutItems })
    return data
  } catch (error) {
    console.error("error editing all about items:", error)
    throw error
  }
}
