export const login = async (event) => {
  const authHeader = event.headers?.Authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Authorization header missing or invalid" }),
    }
  }

  const accessKey = authHeader.replace("Bearer ", "")

  if (accessKey !== process.env.ACCESS_KEY) {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Invalid access key" }),
    }
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({ apiKey: process.env.API_KEY }),
  }
}
