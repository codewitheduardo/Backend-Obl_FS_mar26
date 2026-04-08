import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./v1/config/db.js";
import { notFoundMiddleware } from "./v1/middlewares/notFound.middleware.js";
import v1Router from "./v1/index.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Cook Book");
});

app.use("/v1", v1Router);

app.use(notFoundMiddleware);

export default app;