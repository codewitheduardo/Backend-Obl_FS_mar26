import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
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
router.get("/:id", obtenerCategoriaPorId);
router.put(
  "/:id",
  validateBodyMiddleware(updateCategoriaSchema),
  editarCategoria,
);
router.delete("/:id", eliminarCategoria);

export default router;
