import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { updatePlanSchema } from "../validators/usuarios.validators.js";
import {
  cambiarPlan,
  actualizarFotoUsuario,
} from "../controllers/usuarios.controller.js";

const router = express.Router({ mergeParams: true });

router.patch(
  "/plan",
  validateBodyMiddleware(updatePlanSchema),
  cambiarPlan
);

router.patch(
  "/foto",
  upload.single("foto"),
  actualizarFotoUsuario
);

export default router;