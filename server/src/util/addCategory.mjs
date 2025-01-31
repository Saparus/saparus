import { v4 as uuid } from "uuid"
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb"

import { db } from "../../util/db.mjs"
import { uploadImage } from "../../util/s3.mjs"
import { updateGlobalCategories } from "../../util/updateGlobalCategories.mjs"

const addCategory = (category) => {}
