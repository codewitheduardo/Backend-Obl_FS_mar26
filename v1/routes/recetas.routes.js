import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateObjectIdMiddleware } from "../middlewares/validateObjectId.middleware.js";
import {
  recetaSchema,
  updateRecetaSchema
} from "../validators/recetas.validators.js";
import {
  obtenerRecetas,
  crearReceta,
  obtenerRecetaPorId,
  editarReceta,
  eliminarReceta
} from "../controllers/recetas.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerRecetas);
router.post("/", validateBodyMiddleware(recetaSchema), crearReceta);
router.get("/:id", validateObjectIdMiddleware, obtenerRecetaPorId);
router.put("/:id", validateObjectIdMiddleware, validateBodyMiddleware(updateRecetaSchema), editarReceta);
router.delete("/:id", validateObjectIdMiddleware, eliminarReceta);

export default router;
