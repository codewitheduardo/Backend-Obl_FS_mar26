import express from "express";
import { subirImagen } from "../controllers/uploads.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/", upload.single("imagen"), subirImagen);

export default router;