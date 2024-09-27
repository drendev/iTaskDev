"use client";

import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GoX, GoXCircle, GoXCircleFill } from "react-icons/go";

interface InformationPageProps {
  params: {
    projectId: string;
  }
}

const formSchema = z.object({
  tasks: z.array(
    z.object({
      content: z.string().min(1, "Task cannot be empty"),
    })
  ),
});

const InformationPage = ({
  params,
}: InformationPageProps) => {
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
        { content: values.tasks }
      );
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`tasks.${index}.content`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex w-96 items-center gap-5">
                      <Input
                        disabled={false}
                        placeholder={`Task ${index + 1}`}
                        {...field}
                        required
                        autoComplete="off"
                        className="mb-2"
                      />
                      <GoXCircle
                        onClick={() => {
                            if (fields.length > 1) {
                            remove(index);
                            }
                        }}
                        className={fields.length > 1 ? "w-6 h-6 cursor-pointer flex items-center justify-center" : "fill-zinc-400 w-6 h-6 cursor-not-allowed"}
                        />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          ))}

          <Button
            type="button"
            onClick={() => append({ content: "" })}
            className="mt-4"
            size="sm"
          >
            Add More Tasks
          </Button>

          <Button type="submit" size="sm" className="mt-4 text-sm">
            Submit Tasks
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InformationPage;
