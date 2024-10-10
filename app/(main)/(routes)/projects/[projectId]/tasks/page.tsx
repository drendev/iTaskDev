"use client";

import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { GoXCircle } from "react-icons/go";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  tasks: z.array(
    z.object({
      content: z.string().min(1, "Task cannot be empty"),
      dueDate: z.date().min(new Date(), "Due date must be in the future"),
    })
  ),
});

const TaskList = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tasks: [{ content: "", dueDate: new Date() }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "tasks",
    control: form.control,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/workspaces/-/create/tasks`, {
        tasks: values.tasks,
      });
      // form.reset();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Header */}
      {/* CREATE TASK */}
      <Dialog>
        <DialogTrigger>
          <Button>Add Task</Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-scroll lg:min-w-[1200px] h-[500px]">
          <DialogHeader>Add Task</DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {fields.map((field, index) => (
                  <Card key={field.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Task
                        <GoXCircle
                          onClick={() => {
                            if (fields.length > 1) {
                              remove(index);
                            }
                          }}
                          className={
                            fields.length > 1
                              ? "w-6 h-6 cursor-pointer flex items-center justify-center"
                              : "fill-zinc-400 w-6 h-6 cursor-not-allowed"
                          }
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name={`tasks.${index}.content`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={false}
                                placeholder={`Task ${index + 1}`}
                                {...field}
                                required
                                autoComplete="off"
                                className="mb-2"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`tasks.${index}.dueDate`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="mt-3">Deadline:</FormLabel>

                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() ||
                                    date > new Date("2027-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                  </Card>
                ))}
              </div>
              <CardFooter className=" bg-white sticky bottom-[-30px] mt-10">
                <div>
                  <Button
                    type="button"
                    onClick={() => append({ content: "", dueDate: new Date() })}
                    className="mt-4"
                    size="sm"
                  >
                    Add More Tasks
                  </Button>

                  <Button
                    disabled={loading}
                    type="submit"
                    size="sm"
                    className="mt-4 text-sm ml-5"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>Proceed</>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* TWO CARDS */}
      {/* Task List */}
      {/* Assigned to you */}
      <div className="grid grid-cols-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Assigned to You</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
        {/* All Tasks sorted chronologically with deadline */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>All tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead>Intensity</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead className="text-right">Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="break-all">
                    afdawfdwagklifhjdwalgifgwliafdhklwafdglhedaggljglewguhguilewguileauilaewgdiulaweiguduiagwugiwaedguiawed
                  </TableCell>
                  <TableCell>Hard</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>

      {/*  */}
    </div>
  );
};

export default TaskList;
