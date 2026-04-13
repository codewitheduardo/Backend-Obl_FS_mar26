import Usuario from "../models/usuario.model.js";

export const cambiarPlanService = async (usuarioId, nuevoPlan) => {
  const usuario = await Usuario.findById(usuarioId);

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (usuario.rol !== "chef") {
    const error = new Error("Solo los usuarios chef pueden cambiar de plan");
    error.statusCode = 403;
    throw error;
  }

  if (usuario.plan !== "plus") {
    const error = new Error("Solo se puede cambiar de plus a premium");
    error.statusCode = 409;
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
      foto: usuario.foto,
    },
  };
};