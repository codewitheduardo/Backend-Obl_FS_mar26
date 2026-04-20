import express from "express";
import authRouter from "./routes/auth.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import recetasRouter from "./routes/recetas.routes.js";
import categoriasRouter from "./routes/categorias.routes.js";
import recetasExternasRouter from "./routes/recetasExternas.routes.js";
import favoritosRouter from "./routes/favoritos.routes.js";
import uploadsRouter from "./routes/uploads.routes.js";
import iaRoutes from "./routes/ia.routes.js";
import { autorizationMiddleware } from "./middlewares/auth.middleware.js";

const router = express.Router();

//rutas desprotegidas
router.use("/auth", authRouter);

router.use(autorizationMiddleware);

//rutas protegidas
router.use("/usuarios", usuariosRouter);
router.use("/categorias", categoriasRouter);
router.use("/recetas", recetasRouter);
router.use("/recetas-externas", recetasExternasRouter);
router.use("/favoritos", favoritosRouter);
router.use("/uploads", uploadsRouter);
router.use("/ia", iaRoutes);

export default router;
