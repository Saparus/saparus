import ajax, { authHeaders } from "./ajax"

// get children program articles based on language, limit, and page
export const getChildrenProgramArticles = async (language, limit, page) => {
  try {
    const { data } = await ajax.get(
      `/children/get?language=${language}&limit=${limit}&page=${page}`
    )
    return data
  } catch (error) {
    console.error("error fetching children program articles:", error)
    throw error
  }
}

// get a single children program article by id and language
export const getSingleChildrenProgramArticle = async (id, language) => {
  try {
    const { data } = await ajax.get(`/children/get/${id}?language=${language}`)
    return data
  } catch (error) {
    console.error(`error fetching children program article with id ${id}:`, error)
    throw error
  }
}

// fetch editable children program articles (requires token)
export const getEditChildrenProgramArticles = async (limit, page, token) => {
  if (!token) return

  try {
    const { data } = await ajax.get(
      `/children/getEdit?page=${page}&limit=${limit}`,
      authHeaders(token)
    )
    return data
  } catch (error) {
    console.error("error fetching editable children program articles:", error)
    throw error
  }
}

// fetch a single editable children program article by id (requires token)
export const getEditSingleChildrenProgramArticle = async (id, token) => {
  try {
    const { data } = await ajax.get(`/children/getEdit/${id}`, authHeaders(token))
    return data
  } catch (error) {
    console.error(`error fetching editable children program article with id ${id}:`, error)
    throw error
  }
}

// add a new children program article (requires token)
export const addChildrenProgramArticle = async (title, date, text, image, token) => {
  try {
    const { data } = await ajax.post(
      "/children/add",
      { title, text, date, image },
      authHeaders(token)
    )
    return data
  } catch (error) {
    console.error("error adding children program article:", error)
    throw error
  }
}

// delete a children program article by id (requires token)
export const deleteChildrenProgramArticle = async (id, token) => {
  try {
    const { data } = await ajax.delete(`/children/delete/${id}`, authHeaders(token))
    return data
  } catch (error) {
    console.error(`error deleting children program article with id ${id}:`, error)
    throw error
  }
}

// edit a children program article by id (requires token)
export const editChildrenProgramArticle = async (id, title, text, images, token) => {
  try {
    const { data } = await ajax.patch(
      `/news/edit/${id}`,
      { title, text, images },
      authHeaders(token)
    )
    return data
  } catch (error) {
    console.error(`error editing children program article with id ${id}:`, error)
    throw error
  }
}
