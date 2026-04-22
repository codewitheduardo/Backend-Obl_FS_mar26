import express from "express";
import {
  agregarFavorito,
  obtenerFavoritos,
  eliminarFavorito,
  verificarFavorito,
} from "../controllers/favoritos.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerFavoritos);

router.get("/:mealDbId", verificarFavorito);

router.post("/:mealDbId", agregarFavorito);

router.delete("/:mealDbId", eliminarFavorito);

export default router;