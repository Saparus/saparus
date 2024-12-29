import ajax from "./ajax"

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

// fetch editable news articles (requires api_key)
export const getEditNewsArticles = async (limit, page, api_key) => {
  if (!api_key) return

  try {
    const { data } = await ajax.get(`/news/admin?page=${page}&limit=${limit}?api_key=${api_key}`)
    return data
  } catch (error) {
    console.error("error fetching editable news articles:", error)
    throw error
  }
}

// fetch a single editable news article by id (requires api_key)
export const getEditSingleNewsArticle = async (id, api_key) => {
  try {
    const { data } = await ajax.get(`/news/admin/${id}?api_key=${api_key}`)
    return data
  } catch (error) {
    console.error(`error fetching editable news article with id ${id}:`, error)
    throw error
  }
}

// add a new news article (requires api_key)
export const addNewsArticle = async (title, date, text, image, api_key) => {
  try {
    const { data } = await ajax.post(`/news/create?api_key=${api_key}`, {
      title,
      text,
      date,
      image,
    })
    return data
  } catch (error) {
    console.error("error adding news article:", error)
    throw error
  }
}

// delete a news article by id (requires api_key)
export const deleteNewsArticle = async (id, api_key) => {
  try {
    const { data } = await ajax.delete(`/news/${id}?api_key=${api_key}`)
    return data
  } catch (error) {
    console.error(`error deleting news article with id ${id}:`, error)
    throw error
  }
}

// edit a news article by id (requires api_key)
export const editNewsArticle = async (id, title, text, images, api_key) => {
  try {
    const { data } = await ajax.patch(`/news/${id}?api_key=${api_key}`, { title, text, images })
    return data
  } catch (error) {
    console.error(`error editing news article with id ${id}:`, error)
    throw error
  }
}
