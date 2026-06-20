import {MongoClient , Db , Collection } from "mongodb";

const url = process.env.MONGODB_URI

if(!url) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(url as string);
        await client.connect();
        db = client.db("TODO-APP-WITH-NEXTJS");
    }
    return { client, db };
}

export async function GetTodoCollection(): Promise<Collection> {
    if(!db) {
        const {db:database} = await connectToDatabase();
        return database.collection("todos");
    }
    
    
    return db.collection("todos");

}