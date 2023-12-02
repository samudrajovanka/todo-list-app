import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { error, notFound } from "./api/middlewares/error";
import routes from "./routes";

dotenv.config();

// const { notFound, error } = require("./api/middlewares/error");
// const routes = require("./routes");

const app = express();

/**
 * middleware
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * routes
 */
app.use(routes);
app.use(notFound);
app.use(error);

export default app;
