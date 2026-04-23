import Comentario from "../models/comentario.model.js";
import Receta from "../models/receta.model.js";
import { crearError } from "../utils/error.utils.js";
import { obtenerPaginacion } from "../utils/pagination.utils.js";

export const crearComentarioService = async (usuarioId, recetaId, data) => {
  const receta = await Receta.findById(recetaId);

  if (!receta) {
    throw crearError("Receta no encontrada", 404);
  }

  const comentarioExistente = await Comentario.findOne({
    usuario: usuarioId,
    receta: recetaId,
  });

  if (comentarioExistente) {
    throw crearError("Ya valoraste esta receta", 409);
  }

  const comentario = await Comentario.create({
    usuario: usuarioId,
    receta: recetaId,
    texto: data.texto.trim(),
    valoracion: data.valoracion,
  });

  return comentario;
};

export const editarMiComentarioService = async (usuarioId, recetaId, data) => {
  const receta = await Receta.findById(recetaId);

  if (!receta) {
    throw crearError("Receta no encontrada", 404);
  }

  const comentario = await Comentario.findOne({
    usuario: usuarioId,
    receta: recetaId,
  });

  if (!comentario) {
    throw crearError("Comentario no encontrado", 404);
  }

  if (data.texto !== undefined) {
    comentario.texto = data.texto.trim();
  }

  if (data.valoracion !== undefined) {
    comentario.valoracion = data.valoracion;
  }

  await comentario.save();

  return comentario;
};

export const obtenerComentariosPorRecetaService = async (recetaId, query) => {
  const receta = await Receta.findById(recetaId);

  if (!receta) {
    throw crearError("Receta no encontrada", 404);
  }

  const { page, limit, skip } = obtenerPaginacion(query);

  const filtros = { receta: recetaId };

  const total = await Comentario.countDocuments(filtros);

  const comentarios = await Comentario.find(filtros)
    .populate("usuario", "nombre foto")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const todosLosComentarios = await Comentario.find(filtros).select("valoracion");

  const totalComentarios = todosLosComentarios.length;

  const promedioValoracion =
    totalComentarios > 0
      ? Number(
          (
            todosLosComentarios.reduce(
              (acc, comentario) => acc + comentario.valoracion,
              0
            ) / totalComentarios
          ).toFixed(1)
        )
      : 0;

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    promedioValoracion,
    results: comentarios,
  };
};

export const eliminarComentarioService = async (comentarioId, usuarioId) => {
  const comentario = await Comentario.findById(comentarioId);

  if (!comentario) {
    throw crearError("Comentario no encontrado", 404);
  }

  if (comentario.usuario.toString() !== usuarioId) {
    throw crearError("No tienes permisos para eliminar este comentario", 403);
  }

  await comentario.deleteOne();
};