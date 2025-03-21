"use client";

import { Task } from "@prisma/client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Badge } from "@/components/ui/badge";

import { useCreateTaskStore } from "../../store";

const formSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string(),
      intensity: z.string().min(1, "Intensity cannot be empty"),
    })
  ),
});

export const TasksIntensity = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const id = useCreateTaskStore((state) => state.id);

  const editDetails = () => {
    setEdit(!edit);
  };

  const projectId = id?.[0]?.projectId;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tasks: id?.map((task) => ({
        id: task.id,
        intensity: task.Intensity ?? undefined,
      })),
    },
  });

  // This function will reset the form to its default values
  const resetForm = () => {
    form.reset({
      tasks: id?.map((task) => ({
        id: task.id,
        intensity: task.Intensity ?? undefined,
      })),
    });
    setEdit(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/workspaces/${projectId}/create/tasks/edittask`,
        {
          tasks: values.tasks,
        }
      );
      useCreateTaskStore.setState({ id: response.data });

      form.reset();
      router.refresh();
      setEdit(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const redir = async () => {
    setLoading(true);
    const res = await axios.post("/api/openai/autoassign", {
      CreatedTask: id,
    });

    useCreateTaskStore.setState({ assigned: res.data });
    router.push(`/projects/${projectId}/tasks/taskassign`);
  };

  useEffect(() => {
    resetForm();
  }, [id]);

  return (
    <div className="flex flex-col">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ClipboardCheck size={50} />
            <CardTitle>Confirm Tasks</CardTitle>
          </div>
          <CardDescription>
            Review your initial tasks for your project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {id?.map((task, index) => (
                  <Card key={index} className="w-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        Task
                        {edit ? (
                          <div className="flex items-center gap-3">
                            <FormField
                              control={form.control}
                              name={`tasks.${index}.intensity`}
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <Popover>
                                    <PopoverTrigger className="flex items-center">
                                      <FormControl>
                                        <Badge className="gap-3">
                                          {field.value == null
                                            ? "Select"
                                            : field.value}
                                          <Pen size={10} />
                                        </Badge>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[350px]">
                                      <Button
                                        variant={"ghost"}
                                        onClick={() => {
                                          field.onChange("Easy"); // Updates the form value
                                        }}
                                      >
                                        <Badge className="gap-3">
                                          Easy
                                          <Pen size={10} />
                                        </Badge>
                                      </Button>
                                      <Button
                                        variant={"ghost"}
                                        onClick={() => {
                                          field.onChange("Medium"); // Updates the form value
                                        }}
                                      >
                                        <Badge className="gap-3">
                                          Medium
                                          <Pen size={10} />
                                        </Badge>
                                      </Button>
                                      <Button
                                        variant={"ghost"}
                                        onClick={() => {
                                          field.onChange("Hard"); // Updates the form value
                                        }}
                                      >
                                        <Badge className="gap-3">
                                          Hard
                                          <Pen size={10} />
                                        </Badge>
                                      </Button>
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ) : (
                          <>
                            <Badge>
                              {task.Intensity == null
                                ? "Select"
                                : task.Intensity}
                            </Badge>
                          </>
                        )}
                        {task.Intensity == null && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger type="button">
                                <CircleAlert
                                  className="text-red-400 hover:opacity-50"
                                  size={20}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm font-normal">
                                  Can&apos;t identify task intensity
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>{task.content}</p>
                      <p className="mt-3 font-semibold text-base">Deadline: </p>
                      <p className="text-zinc-500">
                        {task.DateDue?.toString()}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                  </Card>
                ))}
              </div>
              {edit ? (
                <div className="col-span-4 sm:mx-auto text-right space-x-5 mt-10">
                  <Button
                    variant={"secondary"}
                    onClick={resetForm} // Reset to default values
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>Proceed</>
                    )}
                  </Button>{" "}
                </div>
              ) : (
                <div className="col-span-4 sm:mx-auto text-right space-x-5 mt-10">
                  <Button
                    variant={"secondary"}
                    onClick={editDetails}
                    type="button"
                  >
                    Edit Details
                  </Button>

                  <Button
                    type="button"
                    disabled={loading}
                    onClick={() => redir()}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>Proceed</>
                    )}
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-3"></CardFooter>
      </Card>
    </div>
  );
};
