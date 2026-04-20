import mongoose from "mongoose";

export const validateObjectIdMiddleware = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    const error = new Error("ID inválido");
    error.status = 400;
    return next(error);
  }

  next();
};