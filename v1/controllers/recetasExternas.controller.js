import {
  buscarRecetasExternas,
  buscarRecetasPorIngrediente,
  obtenerRecetaExternaPorId,
  obtenerRecetaAleatoria,
  obtenerCategorias,
} from "../services/themealdb.service.js";

export const getBuscarRecetasExternas = async (req, res, next) => {
  try {
    const { q } = req.query;
    const data = await buscarRecetasExternas({ query: q });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getRecetasExternasPorIngrediente = async (req, res, next) => {
  const { ingrediente } = req.query;
  const data = await buscarRecetasPorIngrediente({ ingredient: ingrediente });
  res.status(200).json(data);
};

export const getRecetaExternaDetalle = async (req, res, next) => {
  const { id } = req.params;
  const data = await obtenerRecetaExternaPorId(id);
  res.status(200).json(data);
};

export const getRecetaAleatoria = async (req, res, next) => {
  const data = await obtenerRecetaAleatoria();
  res.status(200).json(data);
};

export const getCategorias = async (req, res, next) => {
  const data = await obtenerCategorias();
  res.status(200).json(data);
};
