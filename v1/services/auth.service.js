import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import { crearError } from "../utils/error.utils.js";
import { construirRespuestaAuth } from "../utils/authResponse.utils.js";
import { verifyGoogleToken } from "./googleAuth.service.js";

export const registerService = async (nombre, email, password, rol) => {
  const usuarioExistente = await Usuario.findOne({ email });

  if (usuarioExistente) {
    const error = crearError("El email ya está registrado", 409);
    throw error;
  }

  const hash = await bcrypt.hash(password, 12);

  const nuevoUsuario = new Usuario({
    nombre,
    email,
    password: hash,
    rol,
    plan: "plus",
    proveedor: "local",
  });

  await nuevoUsuario.save();

  return construirRespuestaAuth(nuevoUsuario);
};

export const loginService = async (email, password) => {
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = crearError("Credenciales inválidas", 401);
    throw error;
  }

  if (usuario.proveedor !== "local") {
    const error = crearError(
      "Este usuario debe iniciar sesión con Google",
      401,
    );
    throw error;
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);

  if (!passwordValida) {
    const error = crearError("Credenciales inválidas", 401);
    throw error;
  }

  return construirRespuestaAuth(usuario);
};

export const loginConGoogleService = async (idToken, rol = "lector") => {
  const googleUser = await verifyGoogleToken(idToken);

  if (!googleUser.emailVerificado) {
    const error = crearError(
      "La cuenta de Google no tiene el email verificado",
      401,
    );
    throw error;
  }

  let usuario = await Usuario.findOne({ email: googleUser.email });

  if (!usuario) {
    usuario = new Usuario({
      nombre: googleUser.nombre,
      email: googleUser.email,
      rol,
      plan: "plus",
      proveedor: "google",
      foto: googleUser.foto || "",
    });

    await usuario.save();
  } else {
    if (usuario.proveedor === "local") {
      const error = crearError(
        "Ya existe una cuenta registrada con ese email usando login local",
        409,
      );
      throw error;
    }

    usuario.nombre = googleUser.nombre || usuario.nombre;
    usuario.foto = googleUser.foto || usuario.foto;

    await usuario.save();
  }

  return construirRespuestaAuth(usuario);
};
