import NotFoundError from "../../exceptions/NotFoundError";
import TodoRepository from "../../repositories/todo";
import { CreateTodoData, GetTodoResponse, UpdateTodoData } from "../../repositories/todo/types";
import { prismaErrorHandling } from "../../lib/prisma/errorHandling";
import { SplitStatusCompleteTask, TodoFormatedStatusCompleteTask } from "./types";
import { Task } from "@prisma/client";

export default class TodoService {
  static async create(data: CreateTodoData) {
    const newTodo = await TodoRepository.create(data);

    return newTodo;
  }

  private static splitStatusCompleteTask(tasks: Task[]) {
    const tasksSplited = tasks.reduce((result, task) => {
      if (task.isCompleted) {
        result.completed.push(task);
      } else {
        result.notCompleted.push(task);
      }

      return result;
    }, { notCompleted: [], completed: [] } as SplitStatusCompleteTask);

    return tasksSplited;
  }

  static async getAll(userId: string) {
    const todos = await TodoRepository.getAll(userId);

    const todosFormatedStatusTask: TodoFormatedStatusCompleteTask[] = [];
    for (const todo of todos) {
      todosFormatedStatusTask.push({
        ...todo,
        tasks: this.splitStatusCompleteTask(todo.tasks)
      });
    }
    
    return todosFormatedStatusTask;
  }

  static async getDetail(todoId: string, userId: string) {
    const todo = await TodoRepository.getDetail(todoId, userId);

    if (!todo) {
      throw new NotFoundError("Todo not found");
    }

    return {
      ...todo,
      tasks: this.splitStatusCompleteTask(todo.tasks)
    }
  }

  static async delete(todoId: string, userId: string) {
    try {
      await TodoRepository.delete(todoId, userId);
    } catch (err) {
      prismaErrorHandling(err, "todo");
    }
  }

  static async update(todoId: string, userId: string, data: UpdateTodoData) {
    try {
      const todoUpdated = await TodoRepository.update(todoId, userId, data);

      return todoUpdated;
    } catch (err) {
      prismaErrorHandling(err, "todo");
    }
  }
}