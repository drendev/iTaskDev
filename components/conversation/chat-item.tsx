"use client";

import { UserAvatar } from "@/app/(invite)/(routes)/pending/_components/user-avatar";
import { Member, MemberRole, User } from "@prisma/client";
import { ActionTooltip } from "@/components/action-tooltip";
import { Edit, FileIcon, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter, useParams } from "next/navigation";

interface ChatItemProps {
    id: string;
    content: string;
    member: Member & {
        user: User
    };
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: Member
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, any>;
}

const roleIconMap = {
    "MEMBER": null,
    "ADMIN": <ShieldCheck className="h-4 w-4 ml-2 text-green-600"/>
}

const formSchema = z.object({
    content: z.string().min(1),
})

export const ChatItem = ({
    id,
    content,
    member,
    timestamp,
    fileUrl,
    deleted,
    currentMember,
    isUpdated,
    socketUrl,
    socketQuery
}: ChatItemProps) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === "Escape" || event.keyCode === 27) {
                setIsEditing(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [])
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content,
        }
    });

    const onMemberClick = () => {
        if (member.id === currentMember.id){
            return;
        }

        router.push(`/messages/${member.userId}`)

    }

    const isLoading = form.formState.isSubmitting;

    const onSubmitForm = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery
            });

            await axios.patch(url, values)

            form.reset();
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        form.reset({
            content: content
        })
    }, [content]);

    const fileType = fileUrl?.split(".").pop();

    const isAdmin = currentMember.role === MemberRole.ADMIN;
    const isOwner = currentMember.id === member.id;
    const canDeleteMessage = !deleted && (isAdmin || isOwner);
    const canEditMessage = !deleted && isOwner && !fileUrl;
    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl

    return (
        <div 
            className={cn(
                "relative group flex items-center p-4 transition w-full",
                isOwner ? "justify-end" : "justify-start"
            )}
        >
            <div 
                className={cn(
                    "group flex gap-x-2 items-start",
                    isOwner ? "bg-slate-200 rounded-lg p-3 max-w-md" : "bg-gray-100 rounded-lg p-3 max-w-md"
                )}
            >
                {!isOwner && (
                    <div
                        onClick={onMemberClick}
                        className="cursor-pointer hover:drop-shadow-md transition"
                    >
                        <UserAvatar
                            src={member.user.image || ""}
                        />
                    </div>
                )}
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2"> 
                        <div className="flex items-center">
                            <p onClick={onMemberClick} className="font-semibold text-sm hover:underline cursor-pointer">
                                {member.user.name}
                            </p>
                            <ActionTooltip label={member.role}>
                                {roleIconMap[member.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-zinc-500">
                            {timestamp}
                        </span>
                    </div>
                    {isImage && (
                        <a 
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                        >
                            <Image 
                            src={fileUrl}
                            alt="content"
                            fill
                            className="object-cover"
                            />
                        </a>
                    )}
                    {isPDF && (
                        <div className="bg-slate-200 relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-10 w-10 fill-zinc-200 stroke-zinc-400" />
                            <a 
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-sm text-zinc-500 hover:underline"
                            >
                            PDF FILE
                            </a>
                        </div>
                    )}
                    {!fileUrl && !isEditing && (
                        <p className={cn(
                            "text-sm text-zinc-600",
                            deleted && "italic text-zinc-500 text-xs mt-1"
                        )}>
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500">
                                    (edited)
                                </span>
                            )}
                        </p>
                    )}
                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form
                            onSubmit={form.handleSubmit(onSubmitForm)}
                            className="flex items-center w-full gap-x-2 pt-2"
                            >
                                <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <div className="relative w-full">
                                                <Input
                                                disabled={isLoading}
                                                className="p-2 bg-zinc-100/90 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600"
                                                placeholder="Edited Message"
                                                {...field}
                                                required
                                                autoComplete="off"
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                                <Button
                                disabled={isLoading}
                                size="sm"
                                >
                                    Save
                                </Button>
                            </form>
                            <span className="text-[10px] mt-1 text-zinc-400">
                                Press escape to cancel, enter to save
                            </span>
                        </Form>
                    )}
                </div>
            </div>
            {canDeleteMessage && (
                <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white border rounded-sm">
                    {canEditMessage && (
                        <ActionTooltip label="Edit">
                            <Edit 
                            onClick={() => setIsEditing(true)}
                            className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-700 transition"
                            />
                        </ActionTooltip>
                    )}
                    <ActionTooltip label="Delete">
                        <Trash
                        onClick={() => onOpen("deleteMessage", {
                            apiUrl: `${socketUrl}/${id}`,
                            query: socketQuery
                        })}
                        className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-700 transition"
                        />
                    </ActionTooltip>
                </div>
            )}
        </div>
    )
}