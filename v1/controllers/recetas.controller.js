export const obtenerRecetas = (req, res) => {
  res.status(200).json({ message: "Listar recetas" });
}

export const crearReceta = (req, res) => {
  res.status(201).json({ message: "Crear receta" });
}

export const obtenerRecetaPorId = (req, res) => {
  res.status(200).json({ message: "Obtener receta por id" });
}

export const editarReceta = (req, res) => {
  res.status(200).json({ message: "Editar receta" });
}

export const eliminarReceta = (req, res) => {
  res.status(200).json({ message: "Eliminar receta" });
}