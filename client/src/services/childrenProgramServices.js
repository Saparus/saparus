import ajax from "./ajax"

// get children program articles based on language, limit, and page
export const getChildrenProgramArticles = async (language, limit, page) => {
  try {
    const { data } = await ajax.get(
      `/children-program?language=${language}&limit=${limit}&page=${page}`
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
    const { data } = await ajax.get(`/children-program/${id}?language=${language}`)
    return data
  } catch (error) {
    console.error(`error fetching children program article with id ${id}:`, error)
    throw error
  }
}

// fetch editable children program articles (requires api_key)
export const getEditChildrenProgramArticles = async (limit, page, api_key) => {
  if (!api_key) {
    return
  }

  try {
    const { data } = await ajax.get(
      `/children-program/admin?page=${page}&limit=${limit}&api_key=${api_key}`
    )
    return data
  } catch (error) {
    console.error("error fetching editable children program articles:", error)
    throw error
  }
}

// fetch a single editable children program article by id (requires api_key)
export const getEditSingleChildrenProgramArticle = async (id, api_key) => {
  if (!api_key) {
    return
  }

  try {
    const { data } = await ajax.get(`/children-program/admin/${id}?api_key=${api_key}`)
    return data
  } catch (error) {
    console.error(`error fetching editable children program article with id ${id}:`, error)
    throw error
  }
}

// add a new children program article (requires api_key)
export const addChildrenProgramArticle = async (title, text, images, api_key) => {
  if (!api_key) {
    return
  }

  try {
    const { data } = await ajax.post(`/children-program?api_key=${api_key}`, {
      title,
      text,
      images,
    })
    return data
  } catch (error) {
    console.error("error adding children program article:", error)
    throw error
  }
}

// delete a children program article by id (requires api_key)
export const deleteChildrenProgramArticle = async (id, api_key) => {
  if (!api_key) {
    return
  }

  try {
    const { data } = await ajax.delete(`/children-program/${id}?api_key=${api_key}`)
    return data
  } catch (error) {
    console.error(`error deleting children program article with id ${id}:`, error)
    throw error
  }
}

// edit a children program article by id (requires api_key)
export const editChildrenProgramArticle = async (id, title, text, images, api_key) => {
  if (!api_key) {
    return
  }

  try {
    const { data } = await ajax.patch(`/children-program/edit/${id}?api_key=${api_key}`, {
      title,
      text,
      images,
    })
    return data
  } catch (error) {
    console.error(`error editing children program article with id ${id}:`, error)
    throw error
  }
}
