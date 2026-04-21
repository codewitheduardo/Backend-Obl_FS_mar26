import Usuario from "../models/usuario.model.js";
import cloudinary from "../config/cloudinary.config.js";
import { crearError } from "../utils/error.utils.js";
import { uploadBufferToCloudinary } from "../utils/uploadToCloudinary.util.js";

export const cambiarPlanService = async (usuarioId, nuevoPlan) => {
  const usuario = await Usuario.findById(usuarioId);

  if (!usuario) {
    throw crearError("Usuario no encontrado", 404);
  }

  if (usuario.rol !== "chef") {
    throw crearError("Solo los usuarios chef pueden cambiar de plan", 403);
  }

  if (nuevoPlan !== "premium") {
    throw crearError("El plan enviado no es válido", 400);
  }

  if (usuario.plan === "premium") {
    throw crearError("El usuario ya tiene el plan premium", 409);
  }

  if (usuario.plan !== "plus") {
    throw crearError("Solo se puede cambiar de plus a premium", 409);
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
      fotoPublicId: usuario.fotoPublicId || "",
    },
  };
};

export const actualizarFotoUsuarioService = async (usuarioId, file) => {
  const usuario = await Usuario.findById(usuarioId);

  if (!usuario) {
    throw crearError("Usuario no encontrado", 404);
  }

  if (!file) {
    throw crearError("Debes subir una imagen", 400);
  }

  const publicIdAnterior = usuario.fotoPublicId || "";

  let resultadoCloudinary;

  try {
    resultadoCloudinary = await uploadBufferToCloudinary(
      cloudinary,
      file.buffer,
      {
        folder: "usuarios",
        resource_type: "auto",
      },
    );
  } catch (error) {
    throw crearError("No se pudo subir la imagen", 502);
  }

  usuario.foto = resultadoCloudinary.secure_url;
  usuario.fotoPublicId = resultadoCloudinary.public_id;

  await usuario.save();

  if (publicIdAnterior) {
    try {
      await cloudinary.uploader.destroy(publicIdAnterior);
    } catch (error) {
      console.error(
        "Error al eliminar imagen anterior de Cloudinary:",
        error.message,
      );
    }
  }

  return {
    id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
    plan: usuario.plan,
    proveedor: usuario.proveedor,
    foto: usuario.foto,
    fotoPublicId: usuario.fotoPublicId,
  };
};
