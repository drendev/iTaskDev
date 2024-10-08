"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";
import { Plus } from "lucide-react";
import qs from "query-string";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    type: "Project Members Chat" | "direct";
    name: string;
}

const formSchema = z.object({
    content: z.string().min(1)
})

export const ChatInput = ({
    apiUrl,
    query,
    type,
    name
}: ChatInputProps) => {
    const { onOpen } = useModal();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query
            });

            await axios.post(url, values);

            form.reset();
            router.refresh();
            inputRef.current?.focus();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            inputRef.current?.focus();
        }
    }, [isLoading]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button
                                        type="button"
                                        onClick={() => onOpen("messageFile", { apiUrl, query })}
                                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 hover:bg-zinc-600 transition rounded-full p-1 flex items-center justify-center"
                                    >
                                        <Plus className="text-white" />
                                    </button>
                                    <Input
                                        ref={inputRef}
                                        disabled={isLoading}
                                        className="px-14 py-6 bg-zinc-200/90 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600"
                                        placeholder={`Message ${type === "direct" ? name : "in " + name}`}
                                        value={field.value}
                                        onChange={field.onChange}
                                        required
                                        autoComplete="off"
                                    />
                                    <div className="absolute top-7 right-8">
                                        <EmojiPicker
                                            onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
