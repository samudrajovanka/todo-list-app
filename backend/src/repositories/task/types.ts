import { Task } from "@prisma/client";

export type CreateTaskData = Pick<Task, "title" | "priority">;

export type UpdateTaskData = Pick<Task, "title" | "priority">;
