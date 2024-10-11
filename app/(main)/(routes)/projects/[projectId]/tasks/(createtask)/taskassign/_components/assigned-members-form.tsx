"use client";

import axios from "axios";
import { useEffect } from "react";

import { useState } from "react";

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

import { useCreateTaskStore } from "../../store";

const AssignedMembersForm = () => {
  const assigned = useCreateTaskStore((state) => state.assigned);
  const id = useCreateTaskStore((state) => state.id);

  useEffect(() => {
    const editTask = async () => {
      try {
        const response = await axios.post(
          `/api/workspaces/${id?.[0]?.projectId}/tasks/getmembers`, assigned
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
            <TableBody></TableBody>
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default AssignedMembersForm;
