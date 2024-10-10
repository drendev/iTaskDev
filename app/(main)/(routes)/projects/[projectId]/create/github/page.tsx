"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import axios from "axios";
import ProgressBar from "../_components/progressbar";
import { useState } from "react";
import { Loader2 } from "lucide-react";
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";

const formSchema = z.object({
  repo: z.string().min(7),
});

interface ModifyGithubPageProps {
  params: {
    projectId: string;
  };
}

const cleanRepoInput = (input: string) => {
  let cleanedInput = input.trim();

  if (cleanedInput.startsWith("https://github.com/")) {
    cleanedInput = cleanedInput.replace("https://github.com/", "");
  }

  return cleanedInput;
};

const ModifyGithubPage = ({ params }: ModifyGithubPageProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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
    const [owner, repo] = cleanedRepoInput.split("/");
    setLoading(true);

    try {
      const response = await axios.post(
        `/api/workspaces/${params.projectId}/create/github`,
        {
          owner,
          repo,
        }
      );

      router.push(`/projects/${params.projectId}`);
    } catch (error) {
      console.log(error);
      toast.error("Repository not detected");
    }
    setLoading(false);
  };

  return (
    <div>
      <ProgressBar progress={100} />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Github size={30} />
            <CardTitle>Connect to Github</CardTitle>
          </div>
          <CardDescription>
            Connect your Github repository to iTaskDev
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              <Button type="submit" disabled={loading} className="mt-5">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>Start your project</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModifyGithubPage;
