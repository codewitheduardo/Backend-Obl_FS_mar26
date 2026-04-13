import {
  crearFavoritoService,
  obtenerFavoritosService,
  eliminarFavoritoService,
  verificarFavoritoService,
} from "../services/favoritos.service.js";

export const agregarFavorito = async (req, res, next) => {
  try {
    const { mealDbId } = req.params;
    const usuarioId = req.user.id;

    const favorito = await crearFavoritoService(
      usuarioId,
      mealDbId,
      req.validatedBody,
    );

    return res.status(201).json({
      message: "Favorito agregado correctamente",
      data: favorito,
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerFavoritos = async (req, res, next) => {
  try {
    const usuarioId = req.user.id;

    const favoritos = await obtenerFavoritosService(usuarioId);

    return res.status(200).json({
      message: "Favoritos obtenidos correctamente",
      data: favoritos,
    });
  } catch (error) {
    next(error);
  }
};

export const eliminarFavorito = async (req, res, next) => {
  try {
    const { mealDbId } = req.params;
    const usuarioId = req.user.id;

    const favoritoEliminado = await eliminarFavoritoService(
      usuarioId,
      mealDbId,
    );

    return res.status(200).json({
      message: "Favorito eliminado correctamente",
      data: favoritoEliminado,
    });
  } catch (error) {
    next(error);
  }
};

export const verificarFavorito = async (req, res, next) => {
  try {
    const { mealDbId } = req.params;
    const usuarioId = req.user.id;

    const esFavorito = await verificarFavoritoService(usuarioId, mealDbId);

    return res.status(200).json({
      message: "Estado de favorito obtenido correctamente",
      data: {
        esFavorito,
      },
    });
  } catch (error) {
    next(error);
  }
};
