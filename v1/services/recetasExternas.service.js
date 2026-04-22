import axios from "axios";

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

  return data.meals?.[0] || null;
};

export const obtenerRecetaAleatoriaService = async () => {
  const { data } = await themealdbApi.get("/random.php");
  return data;
};

export const obtenerCategoriasService = async () => {
  const { data } = await themealdbApi.get("/categories.php");
  return data;
};