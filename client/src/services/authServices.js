import ajax from "./ajax"

// login admin with email and password
export const login = async ({ email, password }) => {
  try {
    const { data } = await ajax.post("/auth/login", { email, password })
    return data
  } catch (error) {
    console.error("error during login:", error)
    throw error
  }
}
