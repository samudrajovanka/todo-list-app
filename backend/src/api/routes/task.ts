import express from "express";
import TaskController from "../controllers/task";

const router = express.Router();

router.post("/:todoId/tasks", TaskController.create);
router.delete("/:todoId/tasks/:taskId", TaskController.delete);
router.patch("/:todoId/tasks/:taskId", TaskController.update);

export default router;
