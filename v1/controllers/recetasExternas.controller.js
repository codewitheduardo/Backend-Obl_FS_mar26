import {
  buscarRecetasExternasService,
  buscarRecetasPorIngredienteService,
  obtenerRecetaExternaPorIdService,
  obtenerRecetaAleatoriaService,
  obtenerCategoriasService,
} from "../services/themealdb.service.js";

export const getBuscarRecetasExternas = async (req, res, next) => {
  const { q } = req.query;
  const data = await buscarRecetasExternasService({ query: q });
  res.status(200).json(data);
};

export const getRecetasExternasPorIngrediente = async (req, res, next) => {
  const { ingrediente } = req.query;
  const data = await buscarRecetasPorIngredienteService({
    ingredient: ingrediente,
  });
  res.status(200).json(data);
};

export const getRecetaExternaDetalle = async (req, res, next) => {
  const { id } = req.params;
  const data = await obtenerRecetaExternaPorIdService(id);
  res.status(200).json(data);
};

export const getRecetaAleatoria = async (req, res, next) => {
  const data = await obtenerRecetaAleatoriaService();
  res.status(200).json(data);
};

export const getCategorias = async (req, res, next) => {
  const data = await obtenerCategoriasService();
  res.status(200).json(data);
};
