import mongoose from "mongoose";
import { Schema } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede superar los 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    plan: {
      type: String,
      enum: ["gratis", "premium"],
      default: "gratis",
    },
    proveedor: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    foto: {
      type: String,
      default: "",
    }
    }
);

export default mongoose.model("Usuario", usuarioSchema);