import mongoose from "mongoose";

export const validateObjectIdMiddleware = (paramName = "id") => {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!mongoose.isValidObjectId(value)) {
      const error = new Error("ID inválido");
      error.status = 400;
      return next(error);
    }

    next();
  };
};