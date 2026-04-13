import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { updatePlanSchema } from "../validators/usuarios.validators.js";
import { cambiarPlan } from "../controllers/usuarios.controller.js";

const router = express.Router({ mergeParams: true });

router.patch(
  "/plan",
  validateBodyMiddleware(updatePlanSchema),
  cambiarPlan
);


export default router;