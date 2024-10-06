"use client";

import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import ProgressBar from "../information/manage/_components/progressbar";

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
    })
  ),
});

const InformationPage = ({ params }: InformationPageProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tasks: [{ content: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "tasks",
    control: form.control,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `/api/workspaces/${params.projectId}/create/tasks`,
        { tasks: values.tasks }
      );
      // form.reset();
      router.push(`/projects/${params.projectId}/create/tasks/manage`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10">
      <ProgressBar progress={49} />
      <Card>
        <CardHeader>
          <CardTitle>Add Tasks</CardTitle>
          <CardDescription>Add initial tasks for your project</CardDescription>
        </CardHeader>
        <CardContent>
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
                    </CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                  </Card>
                ))}
              </div>
              <div className="col-span-4">
                <Button
                  type="button"
                  onClick={() => append({ content: "" })}
                  className="mt-4"
                  size="sm"
                >
                  Add More Tasks
                </Button>

                <Button type="submit" size="sm" className="mt-4 text-sm ml-5">
                  Submit Tasks
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InformationPage;
