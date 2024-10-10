"use client";

import { useCreateTaskStore } from "../store";

import axios from "axios";
import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// const projectMembers = await db.projectInformation.findUnique({
//   where: {
//     workspaceId: params.projectId,
//   },
// });

const TaskAssign = () => {
  const id = useCreateTaskStore((state) => state.id);

  useEffect(() => {
    const editTask = async () => {
      try {
        const response = await axios.post(
          `/api/workspaces/${id?.[0]?.projectId}/tasks/getmembers`
        );
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error editing task:", error);
      }
    };

    editTask();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Assign Members</CardTitle>
          <CardDescription>Automatically assigned by NLP</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Intensity</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Assigned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {id?.map((task, index) => (
                <TableRow>
                  <TableCell className="font-medium">{task.content}</TableCell>
                  <TableCell>{task.Intensity}</TableCell>
                  <TableCell>{task.DateDue?.toString()}</TableCell>
                  <TableCell className="text-right">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default TaskAssign;
