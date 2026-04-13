export const errorMiddleware = (error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json({ error: error.message || "Error interno del servidor" });
};
