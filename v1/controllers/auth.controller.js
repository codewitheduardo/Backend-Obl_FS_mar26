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
