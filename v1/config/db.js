import mongoose from "mongoose";

let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI no está definida");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Conexión a MongoDB establecida");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
};

export default connectDB;