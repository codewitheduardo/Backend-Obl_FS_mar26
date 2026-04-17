import Usuario from "../models/usuario.model.js";
import { crearError } from "../utils/error.utils.js";

export const cambiarPlanService = async (usuarioId, nuevoPlan) => {
  const usuario = await Usuario.findById(usuarioId);

  if (!usuario) {
    const error = crearError("Usuario no encontrado", 404);
    throw error;
  }

  if (usuario.rol !== "chef") {
    const error = crearError("Solo los usuarios chef pueden cambiar de plan", 403);
    throw error;
  }

  if (usuario.plan !== "plus") {
    const error = crearError("Solo se puede cambiar de plus a premium", 409);
    throw error;
  }

  usuario.plan = nuevoPlan;

  await usuario.save();

  return {
    tokenActualizado: false,
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      plan: usuario.plan,
      proveedor: usuario.proveedor,
      foto: usuario.foto || "",
    },
  };
};
