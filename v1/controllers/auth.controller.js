import {
  registerService,
  loginService,
  loginConGoogleService,
} from "../services/auth.service.js";

export const register = async (req, res, next) => {
  const { nombre, email, password, rol } = req.validatedBody;

  const data = await registerService(nombre, email, password, rol);

  return res.status(201).json({
    message: "Registro exitoso",
    data,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.validatedBody;

  const data = await loginService(email, password);

  return res.status(200).json({
    message: "Login exitoso",
    data,
  });
};

export const loginConGoogle = async (req, res, next) => {
  const { idToken } = req.validatedBody;

  const data = await loginConGoogleService(idToken);

  return res.status(200).json({
    message: "Login con Google exitoso",
    data,
  });
};
