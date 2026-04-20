import express from "express";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { updatePlanSchema } from "../validators/usuarios.validators.js";
import {
  cambiarPlan,
  actualizarFotoUsuario,
} from "../controllers/usuarios.controller.js";

const router = express.Router({ mergeParams: true });

// accesible para cualquier usuario autenticado
router.patch(
  "/foto",
  upload.single("foto"),
  actualizarFotoUsuario
);

// protegidas para chefs
router.use(roleMiddleware("chef"));

router.patch(
  "/plan",
  validateBodyMiddleware(updatePlanSchema),
  cambiarPlan
);

export default router;