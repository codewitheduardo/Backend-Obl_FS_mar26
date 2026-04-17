import fs from "fs/promises";
import Receta from "../models/receta.model.js";
import { crearError } from "../utils/error.utils.js";
import { subirImagenACloudinaryService } from "./cloudinary.service.js";

export const obtenerRecetasService = async (usuarioId) => {
  const recetas = await Receta.find({ usuarioId })
    .populate("categoriaId", "nombre")
    .populate("usuarioId", "nombre email")
    .sort({ createdAt: -1 });

  return recetas;
};

export const obtenerRecetaPorIdService = async (id, usuarioId) => {
  const receta = await Receta.findOne({ _id: id, usuarioId })
    .populate("categoriaId", "nombre")
    .populate("usuarioId", "nombre email");

  if (!receta) {
    const error = crearError("Receta no encontrada", 404);
    throw error;
  }

  return receta;
};

export const crearRecetaService = async (data, usuarioId, filePath) => {
  let imagenUrl = "";

  if (filePath) {
    const resultadoCloudinary = await subirImagenACloudinaryService(filePath);
    imagenUrl = resultadoCloudinary.imageUrl;

    await fs.unlink(filePath);
  }

  const receta = await Receta.create({
    titulo: data.titulo,
    descripcion: data.descripcion,
    ingredientes: data.ingredientes,
    pasos: data.pasos,
    tiempoPreparacion: data.tiempoPreparacion,
    porciones: data.porciones,
    dificultad: data.dificultad,
    imagenUrl,
    categoriaId: data.categoriaId,
    usuarioId,
  });

  return receta;
};

export const editarRecetaService = async (id, data, usuarioId, filePath) => {
  const receta = await Receta.findOne({ _id: id, usuarioId });

  if (!receta) {
    const error = crearError("Receta no encontrada", 404);
    throw error;
  }

  if (filePath) {
    const resultadoCloudinary = await subirImagenACloudinaryService(filePath);
    receta.imagenUrl = resultadoCloudinary.imageUrl;

    await fs.unlink(filePath);
  }

  receta.titulo = data.titulo ?? receta.titulo;
  receta.descripcion = data.descripcion ?? receta.descripcion;
  receta.ingredientes = data.ingredientes ?? receta.ingredientes;
  receta.pasos = data.pasos ?? receta.pasos;
  receta.tiempoPreparacion = data.tiempoPreparacion ?? receta.tiempoPreparacion;
  receta.porciones = data.porciones ?? receta.porciones;
  receta.dificultad = data.dificultad ?? receta.dificultad;
  receta.categoriaId = data.categoriaId ?? receta.categoriaId;

  await receta.save();

  return receta;
};

export const eliminarRecetaService = async (id, usuarioId) => {
  const receta = await Receta.findOne({ _id: id, usuarioId });

  if (!receta) {
    const error = crearError("Receta no encontrada", 404);
    throw error;
  }

  await receta.deleteOne();

  return {
    message: "Receta eliminada correctamente",
  };
};
