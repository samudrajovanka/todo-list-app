import { Task, Todo } from "@prisma/client"

export type SplitStatusCompleteTask = {
  completed: Task[],
  notCompleted: Task[]
};

export type TodoFormatedStatusCompleteTask = Todo & {
  tasks: SplitStatusCompleteTask
};
