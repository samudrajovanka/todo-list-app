import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";
import { CreateTodoData, GetAllCondition, GetTodoResponse, GetTodosResponse, UpdateTodoData } from "./types";

export default class TodoRepository {
  static async create(data: CreateTodoData) {
    const todo = await prisma.todo.create({
      data: {
        ...data,
        tasks: {
          createMany: {
            data: data.tasks
          }
        }
      }
    });

    return todo;
  }

  private static getOrderTaskQuery(): Prisma.TaskOrderByWithRelationInput[] {
    return [
      {
        isCompleted: "asc",
      },
      {
        priority: "asc",
      },
      {
        createdAt: "desc"
      }
    ]
  }

  static async getAll(userId: string, condition?: GetAllCondition): Promise<GetTodosResponse> {
    const conditionQuery = condition
      ? Prisma.sql` and
        ${typeof condition?.isPinned === 'boolean' ? Prisma.sql`o."isPinned" = ${condition.isPinned}` : null}`
      : null;
    
    console.log("cond", conditionQuery);

    const todos = await prisma.$queryRaw<GetTodosResponse>`
      select
        o.*,
        count(*) FILTER ( WHERE a."isCompleted" = true )::text as "completedTotal",
        count(*) FILTER ( WHERE a."isCompleted" = false )::text as "uncompletedTotal"
      from "Task" as a
      join "Todo" as o
      on o.id = a."todoId"
      where o."createdBy" = ${userId}
      ${Prisma.sql`${conditionQuery}`}
      group by o.id;`

    return todos;
  }

  static async getDetail(id: string, userId: string): Promise<GetTodoResponse | null> {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
        createdBy: userId
      },
      include: {
        tasks: {
          orderBy: this.getOrderTaskQuery()
        }
      }
    });

    return todo;
  }

  static async delete(id: string, userId: string) {
    const todoDeleted = await prisma.todo.delete({
      where: {
        id,
        createdBy: userId
      }
    });

    return todoDeleted;
  }

  static async update(id: string, userId: string, data: UpdateTodoData) {
    const todoUpdated = await prisma.todo.update({
      data,
      where: {
        id,
        createdBy: userId
      }
    });

    return todoUpdated;
  }
}
