import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { registerSchema, loginSchema, googleLoginSchema } from "../validators/auth.validators.js";
import { register, login, loginConGoogle } from "../controllers/auth.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/register", register);
router.post("/login", login);
router.post("/google", validateBodyMiddleware(googleLoginSchema), loginConGoogle);

export default router;