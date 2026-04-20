import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateObjectIdMiddleware } from "../middlewares/validateObjectId.middleware.js";
import { parseJsonFields } from "../middlewares/parseJsonFields.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  recetaSchema,
  updateRecetaSchema,
} from "../validators/recetas.validators.js";
import {
  obtenerRecetas,
  obtenerMisRecetas,
  crearReceta,
  obtenerRecetaPorId,
  editarReceta,
  eliminarReceta,
} from "../controllers/recetas.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerRecetas);

router.get("/mis-recetas", obtenerMisRecetas);

router.get("/:id", validateObjectIdMiddleware, obtenerRecetaPorId);

router.post(
  "/",
  upload.single("imagen"),
  parseJsonFields(["ingredientes", "pasos"]),
  validateBodyMiddleware(recetaSchema),
  crearReceta,
);

router.put(
  "/:id",
  validateObjectIdMiddleware,
  upload.single("imagen"),
  parseJsonFields(["ingredientes", "pasos"]),
  validateBodyMiddleware(updateRecetaSchema),
  editarReceta,
);

router.delete("/:id", validateObjectIdMiddleware, eliminarReceta);

export default router;
