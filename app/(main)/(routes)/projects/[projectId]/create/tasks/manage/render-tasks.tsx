"use client";

import { Task } from "@prisma/client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Loader2 } from "lucide-react";
import { useState } from "react";
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
  FormDescription,
  FormMessage,
  FormLabel,
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

interface RenderInformationProps {
  info: Task[];
}

const formSchema = z.object({
  tasks: z.array(
    z.object({
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
      tasks: [{ intensity: "" }],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post(`/api/workspaces/${projectId}/create/edittask`, {});

      form.reset();
      router.refresh();
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        <CardContent className="grid grid-cols-4 gap-5">
          {info.map((task, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  Task
                  {edit ? (
                    <Form {...form}>
                      <form className="" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                          control={form.control}
                          name={`tasks.${index}.intensity`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              {/* <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Badge className="gap-3">
                                      {field.value
                                        ? field.value
                                        : task.Intensity}{" "}
                                      <Pen size={10} />
                                    </Badge>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Select
                                    disabled={loading}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue
                                        defaultValue="Weekly"
                                        placeholder="Weekly"
                                      />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem value="Weekly">
                                          Weekly
                                        </SelectItem>
                                        <SelectItem value="Bi-Weekly">
                                          Bi-Weekly
                                        </SelectItem>
                                        <SelectItem value="Monthly">
                                          Monthly
                                        </SelectItem>
                                        <SelectItem value="At Major Milestones">
                                          At Major Milestones
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </PopoverContent>
                              </Popover> */}

                              <Popover>
                                <PopoverTrigger>
                                  <FormControl>
                                    <Badge className="gap-3">
                                      {field.value
                                        ? field.value
                                        : task.Intensity}{" "}
                                      <Pen size={10} />
                                    </Badge>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[350px]">
                                  <Button
                                    variant={"ghost"}
                                    onClick={() => {
                                      (field.value = "Easy"),
                                        console.log(field.value);
                                    }}
                                    onSelect={field.onChange}
                                  >
                                    {" "}
                                    <Badge className="gap-3">
                                      Easy
                                      <Pen size={10} />
                                    </Badge>
                                  </Button>
                                  <Button variant={"ghost"}>
                                    {" "}
                                    <Badge className="gap-3">
                                      Medium
                                      <Pen size={10} />
                                    </Badge>
                                  </Button>
                                  <Button variant={"ghost"}>
                                    {" "}
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
                      </form>
                    </Form>
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
        </CardContent>
        <CardFooter className="flex justify-end space-x-3">
          <Button
            className="w-40"
            variant={"secondary"}
            onClick={() => editDetails()}
          >
            Edit Details
          </Button>
          <Button className="w-40">Proceed</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
