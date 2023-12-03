import { Task, Todo } from "@prisma/client";

export type CreateTodoData = Pick<Todo, "title" | "color" | "isPinned" | "createdBy"> & {
  tasks: Pick<Task, "title" | "priority">[]
};

export type UpdateTodoData =  Pick<Todo, "title" | "color" | "isPinned">;

export type GetTodoResponse = Todo & {
  tasks: Task[]
};

export type GetTodosResponse = Todo & {
  completedTotal: number;
  uncompletedTotal: number;
}[];

export type GetAllCondition = {
  isPinned?: boolean;
};
