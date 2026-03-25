import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateParamsMiddleware } from "../middlewares/validateParams.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdParamSchema,
} from "../validators/categorias.validators.js";
import { obtenerCategorias, crearCategoria, obtenerCategoriaPorId, editarCategoria, eliminarCategoria } from "../controllers/categorias.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerCategorias);

router.post("/", validateBodyMiddleware(createCategorySchema), crearCategoria);

router.get("/:id", validateParamsMiddleware(categoryIdParamSchema), obtenerCategoriaPorId);

router.put(
  "/:id",
  validateParamsMiddleware(categoryIdParamSchema),
  validateBodyMiddleware(updateCategorySchema),
  editarCategoria
);

router.delete("/:id", validateParamsMiddleware(categoryIdParamSchema), eliminarCategoria);

export default router;