import mongoose from "mongoose";
import { Schema } from "mongoose";

const favoritoSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    mealDbId: {
      type: String,
    },
    nombre: {
      type: String,
    },
    imagenUrl: {
      type: String,
      default: "",
    },
    categoria: {
      type: String,
      default: "",
    },
    area: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

favoritoSchema.index({ usuario: 1, mealDbId: 1 }, { unique: true });

export default mongoose.model("Favorito", favoritoSchema);