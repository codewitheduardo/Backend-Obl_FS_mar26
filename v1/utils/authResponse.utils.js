import { generarToken } from "./jwt.utils.js";

export const construirRespuestaAuth = (usuario) => {
  const token = generarToken(usuario);

  return {
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      plan: usuario.plan,
      proveedor: usuario.proveedor,
      foto: usuario.foto || "",
    },
    token,
  };
};