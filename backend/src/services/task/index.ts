import { prismaErrorHandling } from "../../lib/prisma/errorHandling";
import TaskRepository from "../../repositories/task";
import { CreateTaskData, UpdateTaskData } from "../../repositories/task/types";

export default class TaskService {
  static async create(todoId: string, data: CreateTaskData) {
    try {
      const newTask = await TaskRepository.create(todoId, data);
  
      return newTask;
    } catch (err) {
      prismaErrorHandling(err, 'todo');
    }
  }

  static async update(userId: string, todoId: string, taskId: string, data: UpdateTaskData) {
    try {
      const taskUpdated = await TaskRepository.update(userId, todoId, taskId, data);
  
      return taskUpdated;
    } catch (err) {
      prismaErrorHandling(err, "task"); 
    }
  }

  static async delete(userId: string, todoId: string, taskId: string) {
    try {
      await TaskRepository.delete(userId, todoId, taskId);
    } catch (err) {
      prismaErrorHandling(err, "task");
    }
  }
}
