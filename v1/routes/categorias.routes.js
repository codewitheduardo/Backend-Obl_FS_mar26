import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateObjectIdMiddleware } from "../middlewares/validateObjectId.middleware.js";
import {
  categoriaSchema,
  updateCategoriaSchema,
} from "../validators/categorias.validators.js";
import {
  obtenerCategorias,
  crearCategoria,
  obtenerCategoriaPorId,
  editarCategoria,
  eliminarCategoria,
} from "../controllers/categorias.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerCategorias);

router.post("/", validateBodyMiddleware(categoriaSchema), crearCategoria);

router.get("/:id", validateObjectIdMiddleware, obtenerCategoriaPorId);

router.put(
  "/:id",
  validateObjectIdMiddleware,
  validateBodyMiddleware(updateCategoriaSchema),
  editarCategoria,
);

router.delete("/:id", validateObjectIdMiddleware, eliminarCategoria);

export default router;
