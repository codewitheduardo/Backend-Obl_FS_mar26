import express from 'express';
import authRouter from './routes/auth.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import recetasRouter from './routes/recetas.routes.js';
import categoriasRouter from './routes/categorias.routes.js';
import recetasExternasRoutes from './routes/recetasExternas.routes.js';

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "API v1 funcionando correctamente" });
});

router.use("/auth", authRouter);
router.use("/usuarios", usuariosRouter);
router.use("/recetas", recetasRouter);
router.use("/categorias", categoriasRouter);
router.use("/recetas-externas", recetasExternasRoutes);

export default router;