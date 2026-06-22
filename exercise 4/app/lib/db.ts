import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  if (!db) {
    db = client.db("todo_app");
  }

  return { client, db };
}

export async function GetTodoCollection() {
  const { db } = await connectToDatabase();
  return db.collection("todos");
}