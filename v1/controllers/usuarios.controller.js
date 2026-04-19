import {
  cambiarPlanService,
  actualizarFotoUsuarioService,
} from "../services/usuarios.service.js";

export const cambiarPlan = async (req, res, next) => {
  const { plan } = req.validatedBody;
  const usuarioId = req.user.id;

  const data = await cambiarPlanService(usuarioId, plan);

  return res.status(200).json({
    message: "Plan actualizado correctamente",
    data,
  });
};

export const actualizarFotoUsuario = async (req, res, next) => {
  const usuarioId = req.user.id;

  const data = await actualizarFotoUsuarioService(usuarioId, req.file);

  return res.status(200).json({
    message: "Foto actualizada correctamente",
    data,
  });
};