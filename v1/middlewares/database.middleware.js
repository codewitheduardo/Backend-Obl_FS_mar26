import connectDB from "../config/db.js";

export const databaseMiddleware = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
};