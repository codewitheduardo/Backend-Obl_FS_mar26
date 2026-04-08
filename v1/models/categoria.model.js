import mongoose from "mongoose";
import { Schema } from "mongoose";

const categoriaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  descripcion: {
    type: String,
    default: "",
    trim: true,
  },
  timestamps: true,
  versionKey: false,
});

export default mongoose.model("Categoria", categoriaSchema);
