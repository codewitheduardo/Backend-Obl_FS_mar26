import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import connectDB from "./v1/config/db.js";
import { notFoundMiddleware } from "./v1/middlewares/notFound.middleware.js";
import { errorMiddleware } from "./v1/middlewares/error.middleware.js";
import v1Router from "./v1/index.js";

dotenv.config();
connectDB();

const app = express();

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: "Demasiadas solicitudes desde esta IP, intenta más tarde",
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Cook Book");
});

app.use("/v1", v1Router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
