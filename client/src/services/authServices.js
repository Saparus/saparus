import ajax from "./ajax"

// login admin with API key
export const login = async (authCode) => {
  try {
    const { data } = await ajax.post("/auth/login", null, {
      headers: { Authorization: `Bearer ${authCode}` },
    })
    return data
  } catch (error) {
    console.error("error during login:", error)
    throw error
  }
}
