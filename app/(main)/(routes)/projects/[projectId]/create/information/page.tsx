"use client";


import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import qs from "query-string";
import axios from "axios";

import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface InformationPageProps {
    params: {
        projectId: string;
    }
}

const formSchema = z.object({
    content: z.string().min(1)
})

const InformationPage = ({
    params
}: InformationPageProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post(`/api/workspaces/${params.projectId}/create/information`, { content: values.content });

            form.reset();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField 
                control={form.control}
                name="content"
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <div className="relative p-4 pb-6">
                                <Input 
                                disabled={false}
                                className="px-2 py-6 w-36 bg-zinc-200/90 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600"
                                placeholder="Task beta"
                                {...field}
                                required
                                autoComplete="off"
                                />
                            </div>
                        </FormControl>
                    </FormItem>
                )}
                />
                <Button type="submit">
                    Add Task
                </Button>
                </form>
            </Form>
        </div>
    )
}

export default InformationPage;