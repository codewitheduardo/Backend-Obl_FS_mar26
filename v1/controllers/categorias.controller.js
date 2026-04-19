import {
  obtenerCategoriasService,
  obtenerCategoriaPorIdService,
  crearCategoriaService,
  editarCategoriaService,
  eliminarCategoriaService,
} from "../services/categorias.service.js";

export const obtenerCategorias = async (req, res, next) => {
  const categorias = await obtenerCategoriasService();

  return res.status(200).json({
    message: "Categorías obtenidas correctamente",
    data: categorias,
  });
};

export const obtenerCategoriaPorId = async (req, res, next) => {
  const { id } = req.params;

  const categoria = await obtenerCategoriaPorIdService(id);

  return res.status(200).json({
    message: "Categoría obtenida correctamente",
    data: categoria,
  });
};

export const crearCategoria = async (req, res, next) => {
  const categoria = await crearCategoriaService(req.validatedBody);

  return res.status(201).json({
    message: "Categoría creada correctamente",
    data: categoria,
  });
};

export const editarCategoria = async (req, res, next) => {
  const { id } = req.params;

  const categoria = await editarCategoriaService(id, req.validatedBody);

  return res.status(200).json({
    message: "Categoría actualizada correctamente",
    data: categoria,
  });
};

export const eliminarCategoria = async (req, res, next) => {
  const { id } = req.params;

  const resultado = await eliminarCategoriaService(id);

  return res.status(200).json(resultado);
};
