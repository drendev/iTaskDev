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

interface RenderInformationProps {
  info: Task[];
}

const formSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string(),
      intensity: z.string().min(1, "Intensity cannot be empty"),
    })
  ),
});

export const RenderTasks = ({ info }: RenderInformationProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const editDetails = () => {
    setEdit(!edit);
  };

  const projectId = info[0].projectId;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tasks: info.map((task) => ({
        id: task.id,
        intensity: task.Intensity ?? undefined,
      })),
    },
  });

  // This function will reset the form to its default values
  const resetForm = () => {
    form.reset({
      tasks: info.map((task) => ({
        id: task.id,
        intensity: task.Intensity ?? undefined,
      })),
    });
    setEdit(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post(`/api/workspaces/${projectId}/create/edittask`, {
        tasks: values.tasks,
      });
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

  useEffect(() => {
    resetForm();
  }, [info]);

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
                {info.map((task, index) => (
                  <Card key={index} className="w-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        Task
                        {edit ? (
                          <div>
                            <FormField
                              control={form.control}
                              name={`tasks.${index}.intensity`}
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <Popover>
                                    <PopoverTrigger className="flex items-center">
                                      <FormControl>
                                        <Badge className="gap-3">
                                          {field.value}
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
                          <Badge>{task.Intensity}</Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>{task.content}</p>
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
                    onClick={() =>
                      router.push(
                        `/projects/${info[0].projectId}/create/members`
                      )
                    }
                  >
                    Proceed
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
