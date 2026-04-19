export const construirFiltrosRecetas = (usuarioId, query) => {
  const filtros = { usuarioId };

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

  if (query.tiempoMax) {
    filtros.tiempoPreparacion = { $lte: Number(query.tiempoMax) };
  }

  return filtros;
};