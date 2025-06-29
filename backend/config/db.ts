import { MongoClient } from "mongodb";
const URI = process.env.MONGO_URL;
if (!URI) {
  throw new Error("MONGO_URL environment variable is not defined");
}
console.log("URI from db.ts is", URI);
export const client = new MongoClient(URI, { tls: true });
export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MONGODB connected");
  } catch (error) {
    console.log("❌ MONGODB connection error");
  }
}
