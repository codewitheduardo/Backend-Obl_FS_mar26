import { crearError } from "../utils/error.utils.js";

export const mapMealDbToFavorito = (meal) => {
  if (!meal) {
    throw crearError("Receta externa inválida", 404);
  }

  return {
    nombre: meal.strMeal || "",
    imagenUrl: meal.strMealThumb || "",
    categoria: meal.strCategory || "",
    area: meal.strArea || "",
  };
};