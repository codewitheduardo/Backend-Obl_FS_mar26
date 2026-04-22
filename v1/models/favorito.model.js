import mongoose from "mongoose";
import { Schema } from "mongoose";

const favoritoSchema = new Schema(
  {
    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    mealDbId: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
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

favoritoSchema.index({ usuarioId: 1, mealDbId: 1 }, { unique: true });

export default mongoose.model("Favorito", favoritoSchema);