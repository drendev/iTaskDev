"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import axios from "axios";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Badge } from "@/components/ui/badge";

import { useRouter } from "next/navigation";

import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { PiCheckSquareFill } from "react-icons/pi";
import { PiSquare } from "react-icons/pi";

interface MemberInfo {
  memberId: string;
  memberUsername: string | null;
  memberAvatar: any;
}

interface TaskInfo {
  taskId: string;
  taskContent: string;
  taskIntensity: string | null;
  taskDateDue: Date | null;
  taskStatus: any;
  taskMembers: MemberInfo[];
}

interface UserTasksProps {
  tasks: TaskInfo[];
  projectId: string;
}

const FormSchema = z.object({
  taskStatus: z.object({
    id: z.string(),
    status: z.string(),
  }),
});

const UserTasks = ({ tasks, projectId }: UserTasksProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      taskStatus: {
        id: "",
        status: "",
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    const response = await axios.post(
      `/api/workspaces/${projectId}/tasks/setTaskStatus`,
      {
        status: values.taskStatus,
      }
    );
    router.refresh();
  };

  const pendingTasks = tasks
    .filter((task) => task.taskStatus === "Pending")
    .map((task) => ({
      taskId: task.taskId,
      taskContent: task.taskContent,
      taskIntensity: task.taskIntensity,
      taskDateDue: task.taskDateDue,
      taskStatus: task.taskStatus,
      taskMembers: task.taskMembers.map((member) => ({
        memberId: member.memberId,
        memberUsername: member.memberUsername,
        memberAvatar: member.memberAvatar,
      })),
    }));

  // Filter and map done tasks
  const doneTasks = tasks
    .filter((task) => task.taskStatus === "Done")
    .map((task) => ({
      taskId: task.taskId,
      taskContent: task.taskContent,
      taskIntensity: task.taskIntensity,
      taskDateDue: task.taskDateDue,
      taskStatus: task.taskStatus,
      taskMembers: task.taskMembers.map((member) => ({
        memberId: member.memberId,
        memberUsername: member.memberUsername,
        memberAvatar: member.memberAvatar,
      })),
    }));

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
          <CardDescription>Assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="" onSubmit={form.handleSubmit(onSubmit)}>
              {pendingTasks.length >= 1 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">Task</TableHead>
                      <TableHead className="w-[10%]">Intensity</TableHead>
                      <TableHead className="w-[20%]">Deadline</TableHead>
                      <TableHead className="w-[20%]">Assigned</TableHead>
                      <TableHead className="w-[10%]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingTasks.map((task, index) => (
                      <TableRow key={index}>
                        <TableCell>{task.taskContent}</TableCell>
                        <TableCell>{task.taskIntensity}</TableCell>
                        <TableCell>
                          {task.taskDateDue?.toDateString()}
                        </TableCell>
                        <TableCell className="flex gap-3">
                          {task.taskMembers.map((member) => (
                            <Avatar key={member.memberId}>
                              <AvatarImage src={member.memberAvatar} />
                              <AvatarFallback>
                                {member.memberUsername}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name="taskStatus.id"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  {/* No immediate state change, just rendering */}
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="taskStatus.status"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  {/* When the button is clicked, update the task status */}
                                  <Button
                                    type="submit"
                                    variant={"ghost"}
                                    onClick={() => {
                                      form.setValue(
                                        "taskStatus.id",
                                        task.taskId
                                      ); // Set the task ID
                                      form.setValue(
                                        "taskStatus.status",
                                        "Done"
                                      ); // Set status to "Done"
                                    }}
                                  >
                                    <PiSquare size={20} />
                                  </Button>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src="/transhumans/reflecting.png"
                    alt="No tasks"
                    height={200}
                    width={200}
                  />
                  <p>No Pending Tasks</p>
                </div>
              )}

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="hover:no-underline">
                    <Badge className="bg-emerald-500 hover:bg-emerald-400 ml-5">
                      Done
                    </Badge>
                  </AccordionTrigger>

                  <AccordionContent>
                    {" "}
                    {doneTasks.length >= 1 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[40%]">Task</TableHead>
                            <TableHead className="w-[10%]">Intensity</TableHead>
                            <TableHead className="w-[20%]">Deadline</TableHead>
                            <TableHead className="w-[20%]">Assigned</TableHead>
                            <TableHead className="w-[10%]">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {doneTasks.map((task, index) => (
                            <TableRow key={index}>
                              <TableCell>{task.taskContent}</TableCell>
                              <TableCell>{task.taskIntensity}</TableCell>
                              <TableCell>
                                {task.taskDateDue?.toDateString()}
                              </TableCell>
                              <TableCell className="flex gap-3">
                                {task.taskMembers.map((member) => (
                                  <Avatar key={member.memberId}>
                                    <AvatarImage src={member.memberAvatar} />
                                    <AvatarFallback>
                                      {member.memberUsername}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </TableCell>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name="taskStatus.id"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        {/* No immediate state change, just rendering */}
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="taskStatus.status"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        {/* When the button is clicked, update the task status */}
                                        <Button
                                          type="submit"
                                          variant={"ghost"}
                                          onClick={() => {
                                            form.setValue(
                                              "taskStatus.id",
                                              task.taskId
                                            ); // Set the task ID
                                            form.setValue(
                                              "taskStatus.status",
                                              "Pending"
                                            );
                                          }}
                                        >
                                          <PiCheckSquareFill size={20} />
                                        </Button>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Image
                          src="/transhumans/waiting.png"
                          alt="No tasks"
                          height={200}
                          width={200}
                        />
                        <p>No tasks done yet!</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTasks;
