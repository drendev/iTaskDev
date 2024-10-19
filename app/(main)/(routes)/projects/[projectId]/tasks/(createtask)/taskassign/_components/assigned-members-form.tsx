"use client";

import axios from "axios";
import { useEffect } from "react";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";

import { useCreateTaskStore } from "../../store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SquarePen, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";

interface MemberInfo {
  username: string;
  avatar: string;
}

interface CreatedTasksInfo {
  taskContent: string;
  taskIntensity: string;
  taskDateDue: Date;
  members: MemberInfo[];
}

interface AllMembersInfo {
  memberId: string;
  memberUsername: string;
  memberAvatar: string;
}

const formSchema = z.object({
  taskAssign: z.array(
    z.object({
      id: z.string(),
      intensity: z.string().min(1, "Intensity cannot be empty"),
    })
  ),
});

const AssignedMembersForm = () => {
  const assigned = useCreateTaskStore((state) => state.assigned);
  const id = useCreateTaskStore((state) => state.id);
  const [submitLoad, setSubmitLoad] = useState<boolean>(false);

  const router = useRouter();

  const [allMembers, setAllMembers] = useState<AllMembersInfo[] | undefined>(
    undefined
  );
  const [createdTasks, setCreatedTasksInfo] = useState<
    CreatedTasksInfo[] | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTaskData = async () => {
      try {
        const response = await axios.post(
          `/api/workspaces/${id?.[0]?.projectId}/tasks/getTaskAssigned`,
          assigned
        );
        setCreatedTasksInfo(response.data);
        setLoading(false);
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

    const getProjectMembersData = async () => {
      try {
        const response = await axios.post(
          `/api/workspaces/${id?.[0]?.projectId}/tasks/getProjectMembers`
        );
        setAllMembers(response.data);
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching members: ", error);
      }
    };

    getTaskData();
    getProjectMembersData();
  }, []);

  const onFinish = () => {
    setSubmitLoad(true);
    router.push(`/projects/${id?.[0]?.projectId}/tasks`);
  };

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
                <TableHead>Assigned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading &&
                [...Array(3)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              {!loading &&
                createdTasks?.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {task.taskContent}
                    </TableCell>
                    <TableCell>{task.taskIntensity}</TableCell>
                    <TableCell>{task.taskDateDue?.toString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {task.members?.map((member, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Avatar>
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {member.username}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        ))}
                        <Dialog>
                          <DialogTrigger></DialogTrigger>
                          <DialogContent className="overflow-y-scroll lg:min-w-[800px] lg:h-[500px] py-10">
                            <DialogHeader>
                              <DialogTitle>Assign Members</DialogTitle>
                              <DialogDescription>
                                <div className="flex gap-5 my-5">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="flex mx-auto items-center justify-center">
                                          Assigned
                                        </TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {task.members.map((member, index) => (
                                        <TableRow key={index} className="w-20">
                                          <TableCell className="flex text-start justify-between">
                                            <div className="flex items-center gap-3">
                                              <Avatar>
                                                <AvatarImage
                                                  src={member.avatar}
                                                />
                                                <AvatarFallback>
                                                  CN
                                                </AvatarFallback>
                                              </Avatar>
                                              {member.username}
                                            </div>
                                            <div className="flex w-10 h-10 items-center">
                                              <Button variant={"ghost"}>
                                                <Minus size={20} />
                                              </Button>
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>

                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="flex mx-auto items-center justify-center">
                                          All Members
                                        </TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {allMembers?.map(
                                        (member, memberIndex) => {
                                          // Check if the member is part of task.members
                                          const isMemberInTask =
                                            task.members.some(
                                              (taskMember) =>
                                                taskMember.username ===
                                                member.memberUsername
                                            );

                                          // If the member is not in task.members, render the JSX once
                                          if (!isMemberInTask) {
                                            return (
                                              <TableRow
                                                key={memberIndex}
                                                className="w-20"
                                              >
                                                <TableCell className="flex text-start justify-between">
                                                  <div className="flex items-center gap-3">
                                                    <Avatar>
                                                      <AvatarImage
                                                        src={
                                                          member.memberAvatar
                                                        }
                                                      />
                                                      <AvatarFallback>
                                                        CN
                                                      </AvatarFallback>
                                                    </Avatar>
                                                    {member.memberUsername}
                                                  </div>
                                                  <div className="flex w-10 h-10 items-center">
                                                    <Button variant={"ghost"}>
                                                      <Plus size={20} />
                                                    </Button>
                                                  </div>
                                                </TableCell>
                                              </TableRow>
                                            );
                                          }

                                          // Return null if the member is already in task.members
                                          return null;
                                        }
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex gap-3 text-right">
          <Button
            disabled={submitLoad}
            onClick={() => onFinish()}
            className="text-right"
          >
            {submitLoad ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>Proceed</>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssignedMembersForm;
