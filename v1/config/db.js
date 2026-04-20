import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri =
      process.env.NODE_ENV === "development"
        ? process.env.MONGO_URI_DEV
        : process.env.MONGO_URI;

    if (!uri) {
      throw new Error("No se encontró la URI de conexión a MongoDB");
    }

    await mongoose.connect(uri);

    console.log("BD conectada");
  } catch (error) {
    console.error("Error al conectar bd:", error.message);
    throw error;
  }
};

export default connectDB;
