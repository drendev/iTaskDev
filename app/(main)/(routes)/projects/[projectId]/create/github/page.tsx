"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormDescription,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    repo: z.string().min(7),
});

interface ModifyGithubPageProps {
    params: {
        projectId: string;
    }
}

const cleanRepoInput = (input: string) => {
    let cleanedInput = input.trim();

    if (cleanedInput.startsWith('https://github.com/')) {
      cleanedInput = cleanedInput.replace('https://github.com/', '');
    }

    return cleanedInput;
  };

const ModifyGithubPage = ({
    params
}: ModifyGithubPageProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          repo: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!values.repo) {
            return;
        }

        const cleanedRepoInput = cleanRepoInput(values.repo);
        const [owner, repo] = cleanedRepoInput.split('/');

        try {
           const response = await axios.post(`/api/workspaces/${params.projectId}/create/github`, {
             owner,
             repo 
            });

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="repo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Github Repository</FormLabel>
                        <FormControl>
                          <Input
                            disabled={false}
                            placeholder="Repository"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">
                    Submit
                  </Button>
                </form>
            </Form>
        </div>
    )
}

export default ModifyGithubPage;