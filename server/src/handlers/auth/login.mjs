export const login = async (event) => {
  const { accessKey } = JSON.parse(event.body)

  // Validate input
  if (!accessKey) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Access key was not provided" }),
    }
  }

  try {
    // Validate access key
    const validAccessKey = process.env.ACCESS_KEY

    if (accessKey !== validAccessKey) {
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Invalid access key" }),
      }
    }

    // Return the API key
    const apiKey = process.env.API_KEY

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ apiKey }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Internal server error" }),
    }
  }
}
