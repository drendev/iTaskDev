"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { Check, Copy, Loader2, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Label } from "@/components/ui/label";
import { useOrigin } from "@/hooks/use-origin";
import { set } from "react-hook-form";
import axios from "axios";

export const InviteModal = () => {
    const user = useCurrentUser();
    const origin = useOrigin();

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "invite";
    const { workspace } = data;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const inviteUrl = `${origin}/invite/${workspace?.joinCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/workspaces/${workspace?.id}/invite-code`);

            onOpen("invite", { workspace: response.data})
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-4 overflow-hidden">
                <DialogHeader className="px-6">
                    <DialogTitle>Invite Project Member</DialogTitle>
                    <DialogDescription>
                        Invite Member
                    </DialogDescription>
                </DialogHeader>
                <div className="p-6">
                    <Label
                    className="uppercase text-xs font-bold text-zinc-500"
                    >
                        Project Invite Link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                        disabled={isLoading} 
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        value={inviteUrl}
                        />
                        <Button disabled={isLoading} onClick={onCopy} size="icon">
                            {copied 
                                ? <Check className="w-4 h-4" /> 
                                : <Copy className="w-4 h-4" />
                            }
                        </Button>
                    </div>
                    <Button
                    onClick={onNew}
                    disabled={isLoading} 
                    variant="link"
                    size="sm"
                    className="text-xs text-zinc-500 mt-4"
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}