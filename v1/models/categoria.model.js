import mongoose from "mongoose";
import { Schema } from "mongoose";

const categoriaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    descripcion: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("Categoria", categoriaSchema);