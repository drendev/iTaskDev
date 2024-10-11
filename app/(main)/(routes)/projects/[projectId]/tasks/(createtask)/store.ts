import { create } from "zustand";
import { Task } from "@prisma/client";

type AssignedTask = {
  task: string;
  members: string[];
};

type CreateTaskStore = {
  id: Task[] | undefined;
  assigned: AssignedTask[] | undefined;
};

export const useCreateTaskStore = create<CreateTaskStore>(() => ({
  id: undefined,
  assigned: undefined,
}));
