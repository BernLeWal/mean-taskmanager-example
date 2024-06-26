import * as mongodb from "mongodb";
import { Task } from "./task";

export const collections: {
    tasks?: mongodb.Collection<Task>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("TaskManagerExample");
    await applySchemaValidation(db);

    const tasksCollection = db.collection<Task>("tasks");
    collections.tasks = tasksCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Task model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "category", "state"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                category: {
                    bsonType: "string",
                    description: "'category' is required and is a string",
                    minLength: 3
                },
                state: {
                    bsonType: "string",
                    description: "'state' is required and is one of 'open', 'busy', or 'done'",
                    enum: ["open", "busy", "done"],
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
        collMod: "tasks",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("tasks", {validator: jsonSchema});
        }
    });
}