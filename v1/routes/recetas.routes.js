import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
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
router.get("/:id", obtenerRecetaPorId);
router.put("/:id", validateBodyMiddleware(updateRecetaSchema), editarReceta);
router.delete("/:id", eliminarReceta);

export default router;
