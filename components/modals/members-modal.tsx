"use client";

import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ProjectWithMembers } from "@/types";
import { UserAvatar } from "@/app/(invite)/(routes)/pending/_components/user-avatar";
import { GoShieldCheck, GoStack, GoXCircle } from "react-icons/go";
import { ScrollArea } from "../ui/scroll-area";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const roleIconMap = {
    "MEMBER": null,
    "ADMIN": <GoShieldCheck className="h-4 w-4 ml-2 text-green-600" />
}

export const MembersModal = () => {
    const user = useCurrentUser();
    const router = useRouter();

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const [loadingId, setLoadingId] = useState("");

    const { workspace } = data as { workspace: ProjectWithMembers};

    const isModalOpen = isOpen && type === "members";

    const getInitials = (fullName: string): string => {
        const nameParts = fullName.split(' ');
      
        if (nameParts.length < 2) {
          return fullName.charAt(0).toUpperCase(); 
        }
      
        const firstInitial = nameParts[0].charAt(0).toUpperCase();
        const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
      
        return `${firstInitial}${lastInitial}`;
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-4 overflow-hidden">
                <DialogHeader className="px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Project Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {workspace?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[420px] p-6">
                    {workspace?.members?.map((member) => (
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar 
                            src={member.user.image || ""} 
                            fallback={`${getInitials(member.user.name || "")}`}
                            />
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center">
                                    {member.user.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {member.user.email}
                                </p>
                            </div>
                            {workspace.userId !== member.userId && loadingId !== member.userId && (
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical className="w-4 h-4 text-zinc-500"/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="left">
                                            <DropdownMenuItem>
                                            <GoStack className="w-4 h-4 mr-2"/>
                                                Manage Tasks
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                            <GoXCircle className="w-4 h-4 mr-2"/>
                                                Remove
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )}
                            
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}