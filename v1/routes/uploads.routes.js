import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { subirImagenReceta } from "../controllers/uploads.controller.js";

const router = express.Router();

router.post("/", upload.single("imagen"), subirImagenReceta);

export default router;