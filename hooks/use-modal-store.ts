import { ProjectInformation, Task, Workspace } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createProject" | "invite" | "pending" | "members" | "editProject" | "leaveProject" | "deleteProject" | "messageFile" | "deleteMessage" | "editInformation" | "viewTask";

interface ModalData {
    workspace?: Workspace;
    info?: ProjectInformation;
    task?: Task;
    apiUrl?: string;
    query?: Record<string, any>;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })
  }));