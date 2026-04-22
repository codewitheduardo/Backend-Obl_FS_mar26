export const mapMealDbToFavorito = (meal) => {
  return {
    nombre: meal.strMeal || "",
    imagenUrl: meal.strMealThumb || "",
    categoria: meal.strCategory || "",
    area: meal.strArea || "",
  };
};