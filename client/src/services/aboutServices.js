import ajax, { authHeaders } from "./ajax"

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

// get all about items for editing (requires token)
export const getAllEditAboutItems = async (token) => {
  try {
    const { data } = await ajax.get("/about/admin", authHeaders(token))
    return data
  } catch (error) {
    console.error("error fetching about items for editing:", error)
    throw error
  }
}

// edit all about items (requires token)
export const editAllAboutItems = async (aboutItems, token) => {
  try {
    const { data } = await ajax.patch("/about", { aboutItems }, authHeaders(token))
    return data
  } catch (error) {
    console.error("error editing all about items:", error)
    throw error
  }
}
