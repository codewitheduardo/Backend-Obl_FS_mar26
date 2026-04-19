import mongoose from "mongoose";
import { Schema } from "mongoose";

const recetaSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    ingredientes: {
      type: [String],
      required: true,
      default: [],
    },
    pasos: {
      type: [String],
      required: true,
      default: [],
    },
    tiempoPreparacion: {
      type: Number,
      required: true,
    },
    porciones: {
      type: Number,
      required: true,
    },
    dificultad: {
      type: String,
      enum: ["facil", "media", "dificil"],
      required: true,
    },
    imagenUrl: {
      type: String,
      default: "",
    },
    imagenPublicId: {
      type: String,
      default: "",
    },
    categoriaId: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("Receta", recetaSchema);
