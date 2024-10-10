"use client";

import { createContext } from "react";
import { CreatedTaskId } from "./taskcontent/page";

export const CreateTaskContext = createContext<CreatedTaskId | undefined>(undefined);
