import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("✅ MongoDB вже підключена");
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 1) {
    console.log("⚡ Використовую існуюче підключення");
    isConnected = true;
    return mongoose.connection;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ Не вказано MONGODB_URI у .env");
    }

    console.log("⏳ Підключення до MongoDB...");

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB || undefined,
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = mongoose.connection.readyState === 1;
    console.log("✅ MongoDB підключена:", conn.connection.host);

    return conn.connection;
  } catch (err) {
    console.error("❌ Помилка підключення:", err.message);
    throw new Error("Не вдалося підключитись до бази");
  }
}
