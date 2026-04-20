import express from "express";
import { generarTextoIA } from "../controllers/ia.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { generarTextoIASchema } from "../validators/ia.validators.js";

const router = express.Router();

router.post("/generar", validateBodyMiddleware(generarTextoIASchema), generarTextoIA);

export default router;