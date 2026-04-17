import {
  obtenerRecetasService,
  crearRecetaService,
  obtenerRecetaPorIdService,
  editarRecetaService,
  eliminarRecetaService,
} from "../services/recetas.service.js";

export const obtenerRecetas = async (req, res, next) => {
  const usuarioId = req.user.id;

  const recetas = await obtenerRecetasService(usuarioId);

  return res.status(200).json({
    message: "Recetas obtenidas correctamente",
    data: recetas,
  });
};

export const crearReceta = async (req, res, next) => {
  const usuarioId = req.user.id;
  const filePath = req.file ? req.file.path : null;

  const receta = await crearRecetaService(
    req.validatedBody,
    usuarioId,
    filePath,
  );

  return res.status(201).json({
    message: "Receta creada correctamente",
    data: receta,
  });
};

export const obtenerRecetaPorId = async (req, res, next) => {
  const { id } = req.params;
  const usuarioId = req.user.id;

  const receta = await obtenerRecetaPorIdService(id, usuarioId);

  return res.status(200).json({
    message: "Receta obtenida correctamente",
    data: receta,
  });
};

export const editarReceta = async (req, res, next) => {
  const { id } = req.params;
  const usuarioId = req.user.id;
  const filePath = req.file ? req.file.path : null;

  const receta = await editarRecetaService(
    id,
    req.validatedBody,
    usuarioId,
    filePath,
  );

  return res.status(200).json({
    message: "Receta actualizada correctamente",
    data: receta,
  });
};

export const eliminarReceta = async (req, res, next) => {
  const { id } = req.params;
  const usuarioId = req.user.id;

  const resultado = await eliminarRecetaService(id, usuarioId);

  return res.status(200).json(resultado);
};
