import mongoose from "mongoose";
import { Schema } from "mongoose";

const comentarioSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    receta: {
      type: Schema.Types.ObjectId,
      ref: "Receta",
      required: true,
    },
    texto: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 500,
    },
    valoracion: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

comentarioSchema.index({ usuario: 1, receta: 1 }, { unique: true });

export default mongoose.model("Comentario", comentarioSchema);