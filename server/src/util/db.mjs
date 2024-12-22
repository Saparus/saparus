import { DynamoDBClient } from "@aws-sdk"
import { DynamoDBDocumentClient } from "@aws-sdk"

const client = new DynamoDBClient({
  region: "us-west-2",
})

export const db = DynamoDBDocumentClient.from(client)
