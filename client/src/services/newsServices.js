import ajax from "./ajax"

export const getNews = async (language, limit = 5) => {
  return await ajax.get(`/news/get?language=${language}&limit=${limit}`)
}

export const addNews = async (title, date, text, image, token) => {
  const response = await ajax.post(
    "/about/add",
    { title, text, date, image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}
