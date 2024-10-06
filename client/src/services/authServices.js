import ajax from "./ajax"

export const login = async ({ email, password }) => {
  const response = await ajax.post("/auth/login", { email, password })

  return response.data
}
