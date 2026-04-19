import express from "express";
import {
  getBuscarRecetasExternas,
  getRecetasExternasPorIngrediente,
  getRecetaExternaDetalle,
  getRecetaAleatoria,
  getCategorias,
} from "../controllers/recetasExternas.controller.js";

const router = express.Router();

router.get("/buscar", getBuscarRecetasExternas);

router.get("/ingrediente", getRecetasExternasPorIngrediente);

router.get("/aleatoria", getRecetaAleatoria);

router.get("/categorias", getCategorias);

router.get("/:id", getRecetaExternaDetalle);

export default router;