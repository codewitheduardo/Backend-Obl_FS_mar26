import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { databaseMiddleware } from "./v1/middlewares/database.middleware.js";
import { notFoundMiddleware } from "./v1/middlewares/notFound.middleware.js";
import { errorMiddleware } from "./v1/middlewares/error.middleware.js";
import v1Router from "./v1/index.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 30, // máximo 30 requests por IP
  message: "Demasiadas solicitudes desde esta IP, intenta más tarde",
});
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Cook Book");
});

app.use("/v1", databaseMiddleware, v1Router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
