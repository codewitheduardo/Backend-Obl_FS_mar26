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

  const resultadoCloudinary = await uploadBufferToCloudinary(
    cloudinary,
    file.buffer,
    {
      folder: "usuarios",
      resource_type: "auto",
    }
  );

  usuario.foto = resultadoCloudinary.secure_url;
  usuario.fotoPublicId = resultadoCloudinary.public_id;

  await usuario.save();

  if (publicIdAnterior) {
    await cloudinary.uploader.destroy(publicIdAnterior);
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