import express from "express";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateObjectIdMiddleware } from "../middlewares/validateObjectId.middleware.js";
import {
  categoriaSchema,
  updateCategoriaSchema,
} from "../validators/categorias.validators.js";
import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  editarCategoria,
  eliminarCategoria,
} from "../controllers/categorias.controller.js";

const router = express.Router({ mergeParams: true });

// accesible para cualquier usuario autenticado
router.get("/", obtenerCategorias);

router.get("/:id", validateObjectIdMiddleware("id"), obtenerCategoriaPorId);


// protegidas para chefs
router.use(roleMiddleware("chef"));

router.post("/", validateBodyMiddleware(categoriaSchema), crearCategoria);

router.put(
  "/:id",
  validateObjectIdMiddleware("id"),
  validateBodyMiddleware(updateCategoriaSchema),
  editarCategoria,
);

router.delete("/:id", validateObjectIdMiddleware("id"), eliminarCategoria);

export default router;