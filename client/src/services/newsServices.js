import ajax from "./ajax"

export const getNewsArticles = async (language, limit, page) => {
  const response = await ajax.get(`/news/get?language=${language}&limit=${limit}&page=${page}`)

  return response.data
}

export const getSingleNewsArticle = async (id, language) => {
  const response = await ajax.get(`/news/get/${id}?language=${language}`)

  return response.data
}

export const getEditNewsArticles = async (limit, page, token) => {
  if (!token) return

  const response = await ajax.get(`/news/getEdit?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const getEditSingleNewsArticle = async (id, token) => {
  const response = await ajax.get(`/news/getEdit/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const addNewsArticle = async (title, date, text, image, token) => {
  const response = await ajax.post(
    "/news/add",
    { title, text, date, image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export const deleteNewsArticle = async (id, token) => {
  const response = await ajax.delete(`/news/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const editNewsArticle = async (id, title, text, images, token) => {
  const response = await ajax.patch(
    `/news/edit/${id}`,
    { title, text, images },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}
