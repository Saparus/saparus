export const authorize = async (event, context, callback) => {
  try {
    const apiKey = event.queryStringParameters?.api_key
    if (!apiKey) throw new Error("Unauthorized: No API key provided")

    const validApiKey = process.env.API_KEY

    if (apiKey !== validApiKey) throw new Error("Unauthorized: Invalid API key")

    // Generate policy to allow access
    const policy = generatePolicy("user", "Allow", event.methodArn)

    callback(null, policy)
  } catch (error) {
    console.error("Error:", error)
    callback("Unauthorized")
  }
}

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {
    principalId: principalId,
  }

  if (effect && resource) {
    const policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    }

    authResponse.policyDocument = policyDocument
  }

  return authResponse
}
