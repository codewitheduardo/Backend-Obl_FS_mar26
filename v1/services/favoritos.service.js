import Favorito from "../models/favorito.model.js";

export const crearFavoritoService = async (usuarioId, mealDbId, data) => {
  const favoritoExistente = await Favorito.findOne({
    usuarioId,
    mealDbId,
  });

  if (favoritoExistente) {
    const error = new Error("La receta ya está en favoritos");
    error.statusCode = 409;
    throw error;
  }

  const favorito = await Favorito.create({
    usuarioId,
    mealDbId,
    nombre: data.nombre,
    imagenUrl: data.imagenUrl,
    categoria: data.categoria,
    area: data.area,
  });

  return favorito;
};

export const obtenerFavoritosService = async (usuarioId) => {
  return await Favorito.find({ usuarioId }).sort({ createdAt: -1 });
};

export const eliminarFavoritoService = async (usuarioId, mealDbId) => {
  const favoritoEliminado = await Favorito.findOneAndDelete({
    usuarioId,
    mealDbId,
  });

  if (!favoritoEliminado) {
    const error = new Error("El favorito no existe");
    error.statusCode = 404;
    throw error;
  }

  return favoritoEliminado;
};

export const verificarFavoritoService = async (usuarioId, mealDbId) => {
  const favorito = await Favorito.findOne({
    usuarioId,
    mealDbId,
  });

  return !!favorito;
};
