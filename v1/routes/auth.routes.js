import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validators.js";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/register", validateBodyMiddleware(registerSchema), register);
router.post("/login", validateBodyMiddleware(loginSchema), login);

export default router;