import {
  crearComentarioService,
  editarMiComentarioService,
  obtenerComentariosPorRecetaService,
  eliminarComentarioService,
} from "../services/comentarios.service.js";

export const crearComentario = async (req, res, next) => {
  const { recetaId } = req.params;
  const usuarioId = req.user.id;
  const data = req.validatedBody;

  const comentario = await crearComentarioService(usuarioId, recetaId, data);

  return res.status(201).json({
    message: "Comentario creado correctamente",
    data: comentario,
  });
};

export const editarMiComentario = async (req, res, next) => {
  const { recetaId } = req.params;
  const usuarioId = req.user.id;
  const data = req.validatedBody;

  const comentario = await editarMiComentarioService(usuarioId, recetaId, data);

  return res.status(200).json({
    message: "Comentario actualizado correctamente",
    data: comentario,
  });
};

export const obtenerComentariosPorReceta = async (req, res, next) => {
  const { recetaId } = req.params;

  const data = await obtenerComentariosPorRecetaService(recetaId, req.query);

  return res.status(200).json({
    message: "Comentarios obtenidos correctamente",
    data,
  });
};

export const eliminarComentario = async (req, res, next) => {
  const { id } = req.params;
  const usuarioId = req.user.id;

  await eliminarComentarioService(id, usuarioId);

  return res.status(200).json({
    message: "Comentario eliminado correctamente",
  });
};