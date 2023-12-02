import express from "express";
import TodoController from "../controllers/todo";

const router = express.Router();

router.post("/", TodoController.create);
router.get("/", TodoController.getAll);
router.get("/:id", TodoController.getDetail);
router.delete("/:id", TodoController.delete);
router.patch("/:id", TodoController.update);

export default router;
