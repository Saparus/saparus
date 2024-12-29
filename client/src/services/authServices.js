import ajax from "./ajax"

// login admin with email and password
export const login = async (authCode) => {
  try {
    const { data } = await ajax.post("/auth/login", { access_key: authCode })
    return data
  } catch (error) {
    console.error("error during login:", error)
    throw error
  }
}
