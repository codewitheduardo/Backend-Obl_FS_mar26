import Usuario from "../models/usuario.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../utils/googleAuth.js";

const generarToken = (usuario) => {
  return jwt.sign(
    {
      sub: usuario._id,
      email: usuario.email,
      rol: usuario.rol,
      proveedor: usuario.proveedor,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

export const registerService = async (nombre, email, password, rol) => {
  const usuarioExistente = await Usuario.findOne({ email });

  if (usuarioExistente) {
    const error = new Error("El email ya está registrado");
    error.statusCode = 409;
    throw error;
  }

  const hash = await bcrypt.hash(password, 12);

  const nuevoUsuario = new Usuario({
    nombre,
    email,
    password: hash,
    rol,
    proveedor: "local",
  });

  await nuevoUsuario.save();

  const token = generarToken(nuevoUsuario);

  return { token };
};

export const loginService = async (email, password) => {
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    throw error;
  }

  if (usuario.proveedor !== "local") {
    const error = new Error("Este usuario debe iniciar sesión con Google");
    error.statusCode = 401;
    throw error;
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);

  if (!passwordValida) {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    throw error;
  }

  const token = generarToken(usuario);

  return { token };
};

export const loginConGoogleService = async (idToken) => {
  const googleUser = await verifyGoogleToken(idToken);

  if (!googleUser.emailVerificado) {
    const error = new Error("La cuenta de Google no tiene el email verificado");
    error.statusCode = 401;
    throw error;
  }

  let usuario = await Usuario.findOne({ email: googleUser.email });

  if (!usuario) {
    usuario = new Usuario({
      nombre: googleUser.nombre,
      email: googleUser.email,
      rol: "lector",
      proveedor: "google",
      foto: googleUser.foto || "",
    });

    await usuario.save();
  } else {
    if (usuario.proveedor === "local") {
      const error = new Error(
        "Ya existe una cuenta registrada con ese email usando login local"
      );
      error.statusCode = 409;
      throw error;
    }

    usuario.nombre = googleUser.nombre || usuario.nombre;
    usuario.foto = googleUser.foto || usuario.foto;

    await usuario.save();
  }

  const token = generarToken(usuario);

  return { token };
};