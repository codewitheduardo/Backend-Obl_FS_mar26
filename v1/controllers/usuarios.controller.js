import { cambiarPlanService } from "../services/usuarios.service.js";

export const cambiarPlan = async (req, res, next) => {
  const { plan } = req.validatedBody;

  const data = await cambiarPlanService(req.user.sub, plan);

  return res.status(200).json({
    message: "Plan actualizado correctamente",
    data,
  });
};
