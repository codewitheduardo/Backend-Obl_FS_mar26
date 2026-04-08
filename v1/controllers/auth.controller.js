export const register = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.validatedBody;

    const data = await registerService(nombre, email, password, rol);

    return res.status(201).json({
      message: "Registro exitoso",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.validatedBody;

    const data = await loginService(email, password);

    return res.status(200).json({
      message: "Login exitoso",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const loginConGoogle = async (req, res, next) => {
  try {
    const { idToken } = req.validatedBody;

    const data = await loginConGoogleService(idToken);

    return res.status(200).json({
      message: "Login con Google exitoso",
      data,
    });
  } catch (error) {
    next(error);
  }
};
