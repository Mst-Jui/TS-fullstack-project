import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

// Cache connection across hot-reloads in dev
let cached = (global as any).mongooseCache;
if (!cached) {
  cached = (global as any).mongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) {
    throw new Error("Please set MONGODB_URI in .env.local");
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
