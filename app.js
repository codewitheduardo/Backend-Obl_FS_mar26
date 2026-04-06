import express from "express";
import dotenv from "dotenv";
import { notFoundMiddleware } from "./v1/middlewares/notFound.middleware.js";
import v1Router from "./v1/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", v1Router);

app.use(notFoundMiddleware);

export default app;