import {
  obtenerRecetasService,
  obtenerMisRecetasService,
  crearRecetaService,
  obtenerRecetaPorIdService,
  editarRecetaService,
  eliminarRecetaService,
} from "../services/recetas.service.js";

export const obtenerRecetas = async (req, res, next) => {
  const recetas = await obtenerRecetasService(req.query);

  return res.status(200).json({
    message: "Recetas obtenidas correctamente",
    data: recetas,
  });
};

export const obtenerMisRecetas = async (req, res, next) => {
  const usuarioId = req.user.id;

  const recetas = await obtenerMisRecetasService(usuarioId, req.query);

  return res.status(200).json({
    message: "Mis recetas obtenidas correctamente",
    data: recetas,
  });
};

export const crearReceta = async (req, res, next) => {
  const usuarioId = req.user.id;

  const receta = await crearRecetaService(
    req.validatedBody,
    usuarioId,
    req.file,
  );

  return res.status(201).json({
    message: "Receta creada correctamente",
    data: receta,
  });
};

export const obtenerRecetaPorId = async (req, res, next) => {
  const { id } = req.params;
  const usuarioId = req.user?.id || null;

  const receta = await obtenerRecetaPorIdService(id, usuarioId);

  return res.status(200).json({
    message: "Receta obtenida correctamente",
    data: receta,
  });
};

export const editarReceta = async (req, res, next) => {
  const { id } = req.params;
  const usuarioId = req.user.id;

  const receta = await editarRecetaService(
    id,
    req.validatedBody,
    usuarioId,
    req.file,
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
