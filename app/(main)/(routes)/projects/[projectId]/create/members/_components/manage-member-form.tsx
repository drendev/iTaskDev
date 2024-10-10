"use client";

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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
  
import { UserAvatar } from "@/app/(invite)/(routes)/pending/_components/user-avatar";
import { ProjectWithMembers } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface ManageMembersWorkloadFormProps {
    members: ProjectWithMembers;
}

const formSchema = z.object({
    workLoad: z.string().min(1, "Please enter a workload"),
  });

export const ManageMembersWorkloadForm = ({
    members
}: ManageMembersWorkloadFormProps) => {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            workLoad: "",
        },
      });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
    }

    return (
        <div>
            {members.members.map((member) => (
                <div key={member.user.id} className="flex items-center gap-x-2 mb-6">
                    <UserAvatar src={member.user.image || ""} />
                    <div className="flex flex-col gap-y-1">
                        <div className="text-xs font-semibold flex items-center">
                            {member.user.name}
                        </div>
                        <p className="text-xs text-zinc-500">
                            {member.user.email}
                        </p>
                    </div>
                    <div className="flex ml-auto">
                        
                    </div>
                </div>
            ))}
        </div>
    )
}