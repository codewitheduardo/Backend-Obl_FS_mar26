import express from "express";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateObjectIdMiddleware } from "../middlewares/validateObjectId.middleware.js";
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
import comentariosRouter from "./comentarios.routes.js";

const router = express.Router({ mergeParams: true });

// accesible para cualquier usuario autenticado
router.get("/", obtenerRecetas);
router.get("/mis-recetas", obtenerMisRecetas);

router.use(
  "/:recetaId/comentarios",
  validateObjectIdMiddleware("recetaId"),
  comentariosRouter
);

router.get("/:id", validateObjectIdMiddleware("id"), obtenerRecetaPorId);

// protegidas para chefs
router.use(roleMiddleware("chef"));

router.post(
  "/",
  upload.single("imagen"),
  validateBodyMiddleware(recetaSchema),
  crearReceta,
);

router.put(
  "/:id",
  validateObjectIdMiddleware("id"),
  upload.single("imagen"),
  validateBodyMiddleware(updateRecetaSchema),
  editarReceta,
);

router.delete("/:id", validateObjectIdMiddleware("id"), eliminarReceta);

export default router;