import ajax from "./ajax"

export const getAllAboutItems = async (language) => {
  const response = await ajax.get(`/about/get?language=${language}`)

  return response.data
}

export const getAllEditAboutItems = async (token) => {
  console.log(token)

  const response = await ajax.get(`/about/getEdit`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const editAllAboutItems = async (aboutItems, token) => {
  // const dataSize = new TextEncoder().encode(JSON.stringify(aboutItems)).length
  // console.log(`Data size: ${dataSize} bytes`)

  const response = await ajax.patch(
    `/about/edit`,
    { aboutItems },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export const editAboutItem = async (title, text, image, id, token) => {
  const response = await ajax.patch(
    `/about/edit/:${id}`,
    { title, text, image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export const addAboutItem = async (title, text, image, token) => {
  const response = await ajax.post(
    "/about",
    { title, text, image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export const removeAboutItem = async (title, text, image, token) => {
  const response = await ajax.delete(
    "/about",
    { title, text, image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}
