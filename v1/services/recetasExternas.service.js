import axios from "axios";
import { crearError } from "../utils/error.utils.js";

const themealdbApi = axios.create({
  baseURL: process.env.THEMEALDB_BASE_URL,
  timeout: 10000,
});

export const buscarRecetasExternasService = async ({ query }) => {
  const { data } = await themealdbApi.get("/search.php", {
    params: { s: query },
  });

  return data;
};

export const buscarRecetasPorIngredienteService = async ({ ingredient }) => {
  const { data } = await themealdbApi.get("/filter.php", {
    params: { i: ingredient },
  });

  return data;
};

export const obtenerRecetaExternaPorIdService = async (id) => {
  const { data } = await themealdbApi.get("/lookup.php", {
    params: { i: id },
  });

  if (!data.meals || data.meals.length === 0 || !data.meals[0]) {
    throw crearError("Receta externa no encontrada", 404);
  }

  return data.meals[0];
};

export const obtenerRecetaAleatoriaService = async () => {
  const { data } = await themealdbApi.get("/random.php");
  return data;
};

export const obtenerCategoriasService = async () => {
  const { data } = await themealdbApi.get("/categories.php");
  return data;
};