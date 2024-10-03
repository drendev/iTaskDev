"use client";

import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GoX, GoXCircle, GoXCircleFill } from "react-icons/go";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface InformationPageProps {
  params: {
    projectId: string;
  };
}

const formSchema = z.object({
  tasks: z.array(
    z.object({
      content: z.string().min(1, "Task cannot be empty"),
      deadline: z.date().min(new Date(), "Due date must be in the future"),
      priority: z.string().min(1, "Field is required"),
    })
  ),
});

const InformationPage = ({ params }: InformationPageProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tasks: [{ content: "", deadline: undefined, priority: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "tasks",
    control: form.control,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("sumokpa");
    try {
      const response = await axios.post(
        `/api/workspaces/${params.projectId}/create/tasks`,
        { tasks: values.tasks }
      );
      // form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-4"
        >
          {fields.map((field, index) => (
            <Card className="w-[350px]" key={field.id}>
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
                  name={`tasks.${index}.deadline`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
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
                          <PopoverContent className="w-auto p-0" align="start">
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
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tasks.${index}.priority`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          ))}
          <div className="col-span-4">
            <Button
              type="button"
              onClick={() =>
                append({ content: "", deadline: new Date(), priority: "" })
              }
              className="mt-4"
              size="sm"
            >
              Add More Tasks
            </Button>

            <Button type="submit" size="sm" className="mt-4 text-sm">
              Submit Tasks
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InformationPage;
