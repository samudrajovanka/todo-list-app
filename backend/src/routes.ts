import express from "express";

import authRoute from "./api/routes/auth";
import todoRoute from "./api/routes/todo";
import taskRoute from "./api/routes/task";
import authentication from "./api/middlewares/authentication";

const router = express.Router();

/**
 * api routes
 */
router.use("/api/auth", authRoute);
router.use("/api/todos", authentication, todoRoute);
router.use("/api/todos", authentication, taskRoute);

export default router;
