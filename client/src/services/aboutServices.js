import ajax, { authHeaders } from "./ajax"

// get all about items by language
export const getAllAboutItems = async (language) => {
  try {
    const { data } = await ajax.get(`/about/get?language=${language}`)
    return data
  } catch (error) {
    console.error("error fetching all about items:", error)
    throw error
  }
}

// get all about items for editing (requires token)
export const getAllEditAboutItems = async (token) => {
  try {
    const { data } = await ajax.get("/about/getEdit", authHeaders(token))
    return data
  } catch (error) {
    console.error("error fetching about items for editing:", error)
    throw error
  }
}

// edit all about items (requires token)
export const editAllAboutItems = async (aboutItems, token) => {
  try {
    const { data } = await ajax.patch("/about/edit", { aboutItems }, authHeaders(token))
    return data
  } catch (error) {
    console.error("error editing all about items:", error)
    throw error
  }
}

// edit a single about item by id (requires token)
export const editAboutItem = async (title, text, image, id, token) => {
  try {
    const { data } = await ajax.patch(
      `/about/edit/${id}`,
      { title, text, image },
      authHeaders(token)
    )
    return data
  } catch (error) {
    console.error(`error editing about item with id ${id}:`, error)
    throw error
  }
}

// add a new about item (requires token)
export const addAboutItem = async (title, text, image, token) => {
  try {
    const { data } = await ajax.post("/about", { title, text, image }, authHeaders(token))
    return data
  } catch (error) {
    console.error("error adding about item:", error)
    throw error
  }
}

// delete an about item (requires token)
export const removeAboutItem = async (id, token) => {
  try {
    const { data } = await ajax.delete(`/about/${id}`, authHeaders(token))
    return data
  } catch (error) {
    console.error(`error deleting about item with id ${id}:`, error)
    throw error
  }
}
