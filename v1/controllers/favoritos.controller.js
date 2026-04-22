import {
  crearFavoritoService,
  obtenerFavoritosService,
  eliminarFavoritoService,
  verificarFavoritoService,
} from "../services/favoritos.service.js";
import { obtenerRecetaExternaPorIdService } from "../services/recetasExternas.service.js";
import { mapMealDbToFavorito } from "../utils/mealdb.utils.js";

export const agregarFavorito = async (req, res, next) => {
  const { mealDbId } = req.params;
  const usuarioId = req.user.id;

  const meal = await obtenerRecetaExternaPorIdService(mealDbId);
  const data = mapMealDbToFavorito(meal);

  const favorito = await crearFavoritoService(usuarioId, mealDbId, data);

  return res.status(201).json({
    message: "Favorito agregado correctamente",
    data: favorito,
  });
};

export const obtenerFavoritos = async (req, res, next) => {
  const usuarioId = req.user.id;

  const favoritos = await obtenerFavoritosService(usuarioId);

  return res.status(200).json({
    message: "Favoritos obtenidos correctamente",
    data: favoritos,
  });
};

export const eliminarFavorito = async (req, res, next) => {
  const { mealDbId } = req.params;
  const usuarioId = req.user.id;

  const favoritoEliminado = await eliminarFavoritoService(usuarioId, mealDbId);

  return res.status(200).json({
    message: "Favorito eliminado correctamente",
    data: favoritoEliminado,
  });
};

export const verificarFavorito = async (req, res, next) => {
  const { mealDbId } = req.params;
  const usuarioId = req.user.id;

  const esFavorito = await verificarFavoritoService(usuarioId, mealDbId);

  return res.status(200).json({
    message: "Estado de favorito obtenido correctamente",
    data: {
      esFavorito,
    },
  });
};