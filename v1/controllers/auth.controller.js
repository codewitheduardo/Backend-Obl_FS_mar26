import { verifyGoogleToken } from "../services/googleAuth.service.js";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { username, password, plan } = req.body;
  const token = registerService(username, password, plan);

  res.status(201).json({ message: "Usuario registrado correctamente", token });
};

export const login = (req, res) => {
  const { username, password } = req.body;
  const token = loginService(username, password);
  
  if (!token)
    return res.status(401).json({ message: "Credenciales inválidas" });

  res.status(200).json({ message: "Login exitoso", token });
};

export const loginConGoogle = async (req, res, next) => {
  try {
    const { idToken } = req.body;

    const googleUser = await verifyGoogleToken(idToken);

    if (!googleUser.emailVerificado) {
      return res.status(401).json({
        message: "La cuenta de Google no tiene el email verificado",
      });
    }

    const usuario = {
      id: googleUser.googleId,
      nombre: googleUser.nombre,
      email: googleUser.email,
      foto: googleUser.foto,
      proveedor: "google",
    };

    const token = jwt.sign(
      {
        sub: usuario.id,
        email: usuario.email,
        proveedor: usuario.proveedor,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      message: "Login con Google exitoso",
      data: {
        usuario,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};