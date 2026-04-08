import mongoose from "mongoose";
import { Schema } from "mongoose";

const recetaSchema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      minlength: [3, "El título debe tener al menos 3 caracteres"],
      maxlength: [100, "El título no puede superar los 100 caracteres"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
      maxlength: [500, "La descripción no puede superar los 500 caracteres"],
    },
    ingredientes: {
      type: [String],
      required: [true, "Los ingredientes son obligatorios"],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Debe haber al menos un ingrediente",
      },
    },
    pasos: {
      type: [String],
      required: [true, "Los pasos son obligatorios"],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Debe haber al menos un paso",
      },
    },
    tiempoPreparacion: {
      type: Number,
      required: [true, "El tiempo de preparación es obligatorio"],
      min: [1, "El tiempo debe ser mayor a 0"],
    },
    porciones: {
      type: Number,
      required: [true, "La cantidad de porciones es obligatoria"],
      min: [1, "Las porciones deben ser al menos 1"],
    },
    dificultad: {
      type: String,
      enum: ["facil", "media", "dificil"],
      required: [true, "La dificultad es obligatoria"],
    },
    imagenUrl: {
      type: String,
      default: "",
    },
    categoriaId: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: [true, "La categoría es obligatoria"],
    },
    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "El usuario es obligatorio"],
    },
  }
);

export default mongoose.model("Receta", recetaSchema);