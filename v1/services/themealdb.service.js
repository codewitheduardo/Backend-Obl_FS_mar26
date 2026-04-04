import axios from "axios";

const themealdbApi = axios.create({
  baseURL: process.env.THEMEALDB_BASE_URL || "https://www.themealdb.com/api/json/v1/1",
  timeout: 10000,
});

export const buscarRecetasExternas = async ({ query }) => {
  const { data } = await themealdbApi.get("/search.php", {
    params: { s: query },
  });

  return data;
};

export const buscarRecetasPorIngrediente = async ({ ingredient }) => {
  const { data } = await themealdbApi.get("/filter.php", {
    params: { i: ingredient },
  });

  return data;
};

export const obtenerRecetaExternaPorId = async (id) => {
  const { data } = await themealdbApi.get("/lookup.php", {
    params: { i: id },
  });

  return data.meals?.[0] || null;
};

export const obtenerRecetaAleatoria = async () => {
  const { data } = await themealdbApi.get("/random.php");
  return data;
};

export const obtenerCategorias = async () => {
  const { data } = await themealdbApi.get("/categories.php");
  return data;
};