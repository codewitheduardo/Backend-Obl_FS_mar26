import express from 'express';
import authRouter from './routes/auth.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import recetasRouter from './routes/recetas.routes.js';
import categoriasRouter from './routes/categorias.routes.js';
import recetasExternasRoutes from './routes/recetasExternas.routes.js';
import uploadsRouter from './routes/uploads.routes.js';
import { autorizationMiddleware } from './middlewares/auth.middleware.js';

const router = express.Router();

router.use("/auth", authRouter);

router.use(autorizationMiddleware);

//rutas protegidas
router.use("/usuarios", usuariosRouter);
router.use("/recetas", recetasRouter);
router.use("/categorias", categoriasRouter);
router.use("/recetas-externas", recetasExternasRoutes);
router.use("/uploads", uploadsRouter);

export default router;