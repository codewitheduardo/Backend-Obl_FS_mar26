import Categoria from "../models/categoria.model.js";
import Receta from "../models/receta.model.js";
import { crearError } from "../utils/error.utils.js";

export const obtenerCategoriasService = async () => {
  const categorias = await Categoria.find().sort({ nombre: 1 });

  return categorias;
};

export const obtenerCategoriaPorIdService = async (id) => {
  const categoria = await Categoria.findById(id);

  if (!categoria) {
    throw crearError("Categoría no encontrada", 404);
  }

  return categoria;
};

export const crearCategoriaService = async (data) => {
  const categoriaExistente = await Categoria.findOne({
    nombre: data.nombre.trim(),
  });

  if (categoriaExistente) {
    throw crearError("La categoría ya existe", 409);
  }

  const categoria = await Categoria.create({
    nombre: data.nombre.trim(),
    descripcion: data.descripcion?.trim() || "",
  });

  return categoria;
};

export const editarCategoriaService = async (id, data) => {
  const categoria = await Categoria.findById(id);

  if (!categoria) {
    throw crearError("Categoría no encontrada", 404);
  }

  if (data.nombre && data.nombre.trim() !== categoria.nombre) {
    const categoriaExistente = await Categoria.findOne({
      nombre: data.nombre.trim(),
      _id: { $ne: id },
    });

    if (categoriaExistente) {
      throw crearError("Ya existe otra categoría con ese nombre", 409);
    }

    categoria.nombre = data.nombre.trim();
  }

  if (data.descripcion !== undefined) {
    categoria.descripcion = data.descripcion.trim();
  }

  await categoria.save();

  return categoria;
};

export const eliminarCategoriaService = async (id) => {
  const categoria = await Categoria.findById(id);

  if (!categoria) {
    throw crearError("Categoría no encontrada", 404);
  }

  const recetaAsociada = await Receta.findOne({ categoriaId: id });

  if (recetaAsociada) {
    throw crearError(
      "No se puede eliminar la categoría porque tiene recetas asociadas",
      409,
    );
  }

  await categoria.deleteOne();

  return {
    message: "Categoría eliminada correctamente",
  };
};