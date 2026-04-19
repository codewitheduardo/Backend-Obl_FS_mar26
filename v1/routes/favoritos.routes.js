import express from "express";
import {
  agregarFavorito,
  obtenerFavoritos,
  eliminarFavorito,
  verificarFavorito,
} from "../controllers/favoritos.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { favoritoSchema } from "../validators/favoritos.validators.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerFavoritos);

router.get("/:mealDbId", verificarFavorito);

router.post(
  "/:mealDbId",
  validateBodyMiddleware(favoritoSchema),
  agregarFavorito,
);

router.delete("/:mealDbId", eliminarFavorito);

export default router;
