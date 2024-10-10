import { create } from "zustand";
import { Task } from "@prisma/client";

type CreateTaskStore = {
  id: Task[] | undefined;
};

export const useCreateTaskStore = create<CreateTaskStore>(() => ({
  id: undefined,
}));
