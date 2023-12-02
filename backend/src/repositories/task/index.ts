import prisma from "../../lib/prisma";
import { CreateTaskData, UpdateTaskData } from "./types";

export default class TaskRepository {
  static async create(todoId: string, data: CreateTaskData) {
    console.log(todoId)
    const task = await prisma.task.create({
      data: {
        ...data,
        todo: {
          connect: {
            id: todoId
          }
        }
      }
    });

    return task;
  }

  static async update(userId: string, todoId: string, taskId: string, data: UpdateTaskData) {
    const taskUpdated = await prisma.task.update({
      data,
      where: {
        id: taskId,
        todo: {
          id: todoId,
          user: {
            id: userId
          }
        }
      }
    });

    return taskUpdated;
  }

  static async delete(userId: string, todoId: string, taskId: string) {
    const taskDeleted = await prisma.task.delete({
      where: {
        id: taskId,
        todo: {
          id: todoId,
          user: {
            id: userId
          }
        }
      }
    });

    return taskDeleted;
  }
}