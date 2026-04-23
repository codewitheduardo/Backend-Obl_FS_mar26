import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateObjectIdMiddleware } from "../middlewares/validateObjectId.middleware.js";
import {
  comentarioSchema,
  updateComentarioSchema,
} from "../validators/comentarios.validators.js";
import {
  crearComentario,
  editarMiComentario,
  obtenerComentariosPorReceta,
  eliminarComentario,
} from "../controllers/comentarios.controller.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  obtenerComentariosPorReceta,
);

router.post(
  "/",
  validateBodyMiddleware(comentarioSchema),
  crearComentario,
);

router.put(
  "/mio",
  validateBodyMiddleware(updateComentarioSchema),
  editarMiComentario,
);

router.delete(
  "/:id",
  validateObjectIdMiddleware("id"),
  eliminarComentario,
);

export default router;