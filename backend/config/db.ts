import "dotenv/config";
import mongoose from "mongoose";

const URI = process.env.MONGO_URL;
console.log("Loaded MONGO_URL:", process.env.MONGO_URL);

if (!URI) {
  throw new Error("MONGO_URL environment variable is not defined");
}

let cachedClient: ReturnType<typeof mongoose.connection.getClient> | null =
  null;

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1 && cachedClient) {
      console.log("✅ Reusing existing Mongoose connection");
      return cachedClient;
    }

    await mongoose.connect(URI, {
      // dbName: "CarRentalDB",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    } as any);

    cachedClient = mongoose.connection.getClient();
    console.log("✅ Mongoose connected");

    return cachedClient;
  } catch (error) {
    console.error("❌ Mongoose connection error", error);
    throw error;
  }
}
