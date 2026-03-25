import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateParamsMiddleware } from "../middlewares/validateParams.middleware.js";
import { validateQueryMiddleware } from "../middlewares/validateQuery.middleware.js";
import {
  createRecipeSchema,
  updateRecipeSchema,
  recipeIdParamSchema,
  recipeQuerySchema,
} from "../validators/recetas.validators.js";
import { listarRecetas, crearReceta, obtenerRecetaPorId, editarReceta, eliminarReceta } from "../controllers/recetas.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", validateQueryMiddleware(recipeQuerySchema), listarRecetas);
router.post("/", validateBodyMiddleware(createRecipeSchema), crearReceta);
router.get(
  "/:id",
  validateParamsMiddleware(recipeIdParamSchema),
  obtenerRecetaPorId,
);
router.put(
  "/:id",
  validateParamsMiddleware(recipeIdParamSchema),
  validateBodyMiddleware(updateRecipeSchema),
  editarReceta,
);
router.delete(
  "/:id",
  validateParamsMiddleware(recipeIdParamSchema),
  eliminarReceta,
);

export default router;
