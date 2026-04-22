export const construirFiltrosRecetas = (query) => {
  const filtros = {};

  if (query.categoriaId) {
    filtros.categoriaId = query.categoriaId;
  }

  if (query.dificultad) {
    filtros.dificultad = query.dificultad;
  }

  if (query.titulo) {
    filtros.titulo = { $regex: query.titulo, $options: "i" };
  }

  if (query.tiempoPreparacion) {
    filtros.tiempoPreparacion = Number(query.tiempoPreparacion);
  }

  if (query.ingrediente) {
    filtros.ingredientes = { $regex: query.ingrediente, $options: "i" };
  }

  return filtros;
};
