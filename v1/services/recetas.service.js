import Receta from "../models/receta.model.js";
import Usuario from "../models/usuario.model.js";
import cloudinary from "../config/cloudinary.config.js";
import { crearError } from "../utils/error.utils.js";
import { obtenerPaginacion } from "../utils/pagination.utils.js";
import { construirFiltrosRecetas } from "../utils/recetas.utils.js";
import { uploadBufferToCloudinary } from "../utils/uploadToCloudinary.util.js";

export const obtenerRecetasService = async (usuarioId, query) => {
  const { page, limit, skip } = obtenerPaginacion(query);
  const filtros = construirFiltrosRecetas(usuarioId, query);

  const total = await Receta.countDocuments(filtros);

  const recetas = await Receta.find(filtros)
    .populate("categoriaId", "nombre")
    .populate("usuarioId", "nombre email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    results: recetas,
  };
};

export const obtenerRecetaPorIdService = async (id, usuarioId) => {
  const receta = await Receta.findOne({ _id: id, usuarioId })
    .populate("categoriaId", "nombre")
    .populate("usuarioId", "nombre email");

  if (!receta) {
    throw crearError("Receta no encontrada", 404);
  }

  return receta;
};

export const crearRecetaService = async (data, usuarioId, file) => {
  const usuario = await Usuario.findById(usuarioId);

  if (!usuario) {
    throw crearError("Usuario no encontrado", 404);
  }

  if (usuario.plan === "plus") {
    const cantidadRecetas = await Receta.countDocuments({ usuarioId });

    if (cantidadRecetas >= 4) {
      throw crearError("El plan plus permite crear hasta 4 recetas", 403);
    }
  }

  let imagenUrl = "";
  let imagenPublicId = "";

  if (file) {
    const resultadoCloudinary = await uploadBufferToCloudinary(
      cloudinary,
      file.buffer,
      {
        folder: "recetas",
        resource_type: "auto",
      }
    );

    imagenUrl = resultadoCloudinary.secure_url;
    imagenPublicId = resultadoCloudinary.public_id;
  }

  const receta = await Receta.create({
    ...data,
    imagenUrl,
    imagenPublicId,
    usuarioId,
  });

  return receta;
};

export const editarRecetaService = async (id, data, usuarioId, file) => {
  const receta = await Receta.findOne({ _id: id, usuarioId });

  if (!receta) {
    throw crearError("Receta no encontrada", 404);
  }

  const publicIdAnterior = receta.imagenPublicId;

  if (file) {
    const resultadoCloudinary = await uploadBufferToCloudinary(
      cloudinary,
      file.buffer,
      {
        folder: "recetas",
        resource_type: "auto",
      }
    );

    receta.imagenUrl = resultadoCloudinary.secure_url;
    receta.imagenPublicId = resultadoCloudinary.public_id;
  }

  receta.titulo = data.titulo ?? receta.titulo;
  receta.descripcion = data.descripcion ?? receta.descripcion;
  receta.ingredientes = data.ingredientes ?? receta.ingredientes;
  receta.pasos = data.pasos ?? receta.pasos;
  receta.tiempoPreparacion =
    data.tiempoPreparacion ?? receta.tiempoPreparacion;
  receta.porciones = data.porciones ?? receta.porciones;
  receta.dificultad = data.dificultad ?? receta.dificultad;
  receta.categoriaId = data.categoriaId ?? receta.categoriaId;

  await receta.save();

  if (file && publicIdAnterior) {
    await cloudinary.uploader.destroy(publicIdAnterior);
  }

  return receta;
};

export const eliminarRecetaService = async (id, usuarioId) => {
  const receta = await Receta.findOne({ _id: id, usuarioId });

  if (!receta) {
    throw crearError("Receta no encontrada", 404);
  }

  if (receta.imagenPublicId) {
    await cloudinary.uploader.destroy(receta.imagenPublicId);
  }

  await receta.deleteOne();

  return {
    message: "Receta eliminada correctamente",
  };
};