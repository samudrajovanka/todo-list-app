import { NextFunction, Request, Response as ExpressResponse } from "express";
import Response from "../../../lib/response";
import TaskValidation from "../../../validations/task";
import TaskService from "../../../services/task";

export default class TaskController {
  static async create(req: Request, res: ExpressResponse, next: NextFunction) {
    try {
      new TaskValidation(req.body).validateCreate();

      console.log(req)
      const newTodo = await TaskService.create(req.params.todoId, req.body);

      return res.status(201).json(
        Response.success({
          message: "Task created successfully",
          data: {
            todo: newTodo
          }
        })
      );
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: ExpressResponse, next: NextFunction) {
    try {
      await TaskService.delete(req.user!.id, req.params.todoId, req.params.taskId);

      return res.status(200).json(
        Response.success({
          message: "Task deleted successfully"
        })
      );
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: ExpressResponse, next: NextFunction) {
    try {
      new TaskValidation(req.body).validateUpdate();

      const todoUpdated = await TaskService.update(req.user!.id, req.params.todoId, req.params.taskId, req.body);

      return res.status(200).json(
        Response.success({
          message: "Task update successfully",
          data: {
            todo: todoUpdated
          }
        })
      );
    } catch (err) {
      next(err);
    }
  }
}
