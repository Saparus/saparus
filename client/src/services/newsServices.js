import ajax, { authHeaders } from "./ajax"

// get news articles based on language, limit, and page
export const getNewsArticles = async (language, limit, page) => {
  try {
    const { data } = await ajax.get(`/news?language=${language}&limit=${limit}&page=${page}`)
    return data
  } catch (error) {
    console.error("error fetching news articles:", error)
    throw error
  }
}

// get a single news article by id and language
export const getSingleNewsArticle = async (id, language) => {
  try {
    const { data } = await ajax.get(`/news/${id}?language=${language}`)
    return data
  } catch (error) {
    console.error(`error fetching news article with id ${id}:`, error)
    throw error
  }
}

// fetch editable news articles (requires token)
export const getEditNewsArticles = async (limit, page, token) => {
  if (!token) return

  try {
    const { data } = await ajax.get(`/news/admin?page=${page}&limit=${limit}`, authHeaders(token))
    return data
  } catch (error) {
    console.error("error fetching editable news articles:", error)
    throw error
  }
}

// fetch a single editable news article by id (requires token)
export const getEditSingleNewsArticle = async (id, token) => {
  try {
    const { data } = await ajax.get(`/news/admin/${id}`, authHeaders(token))
    return data
  } catch (error) {
    console.error(`error fetching editable news article with id ${id}:`, error)
    throw error
  }
}

// add a new news article (requires token)
export const addNewsArticle = async (title, date, text, image, token) => {
  try {
    const { data } = await ajax.post(
      "/news/create",
      { title, text, date, image },
      authHeaders(token)
    )
    return data
  } catch (error) {
    console.error("error adding news article:", error)
    throw error
  }
}

// delete a news article by id (requires token)
export const deleteNewsArticle = async (id, token) => {
  try {
    const { data } = await ajax.delete(`/news/${id}`, authHeaders(token))
    return data
  } catch (error) {
    console.error(`error deleting news article with id ${id}:`, error)
    throw error
  }
}

// edit a news article by id (requires token)
export const editNewsArticle = async (id, title, text, images, token) => {
  try {
    const { data } = await ajax.patch(`/news/${id}`, { title, text, images }, authHeaders(token))
    return data
  } catch (error) {
    console.error(`error editing news article with id ${id}:`, error)
    throw error
  }
}
