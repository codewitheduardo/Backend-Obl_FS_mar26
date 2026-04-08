import mongoose from "mongoose";
import { Schema } from "mongoose";

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false,
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
  },
  timestamps: true,
  versionKey: false,
});

export default mongoose.model("Usuario", usuarioSchema);
