export const obtenerCategorias = (req, res) => {
  res.status(200).json({ message: "Listar categorías" });
}

export const crearCategoria = (req, res) => {
  res.status(201).json({ message: "Crear categoría" });
}

export const obtenerCategoriaPorId = (req, res) => {
  res.status(200).json({ message: "Obtener categoría por id" });
}

export const editarCategoria = (req, res) => {
  res.status(200).json({ message: "Editar categoría" });
}

export const eliminarCategoria = (req, res) => {
  res.status(200).json({ message: "Eliminar categoría" });
}