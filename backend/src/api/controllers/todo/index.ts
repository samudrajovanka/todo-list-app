import { NextFunction, Request, Response as ExpressResponse } from "express";
import TodoValidation from "../../../validations/todo";
import TodoService from "../../../services/todo";
import Response from "../../../lib/response";

export default class TodoController {
  static async create(req: Request, res: ExpressResponse, next: NextFunction) {
    try {
      new TodoValidation(req.body).validateCreate();

      const newTodo = await TodoService.create({
        ...req.body,
        createdBy: req.user!.id,
      });

      return res.status(201).json(
        Response.success({
          message: "Todo created successfully",
          data: {
            todo: newTodo
          }
        })
      );
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req: Request, res: ExpressResponse, next: NextFunction) {
    try {
      const todos = await TodoService.getAll(req.user!.id);

      return res.status(200).json(
        Response.success({
          message: "Todos retrieved successfully",
          data: {
            todos
          }
        })
      );
    } catch (err) {
      next(err);
    }
  }

  static async getDetail(req: Request, res: ExpressResponse, next: NextFunction) {
    try {
      const todo = await TodoService.getDetail(req.params.id, req.user!.id);

      return res.status(200).json(
        Response.success({
          message: "Todo retrieved successfully",
          data: {
            todo
          }
        })
      );
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: ExpressResponse, next: NextFunction) {
    try {
      await TodoService.delete(req.params.id, req.user!.id);

      return res.status(200).json(
        Response.success({
          message: "Todo deleted successfully"
        })
      );
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: ExpressResponse, next: NextFunction) {
    try {
      new TodoValidation(req.body).validateUpdate();

      const todoUpdated = await TodoService.update(req.params.id, req.user!.id, req.body);

      return res.status(200).json(
        Response.success({
          message: "Todo update successfully",
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
