"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { Check, Copy, Loader2, LockKeyholeIcon, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";

export const InviteModal = () => {
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
        toast.success("Successfully copied the invite link");

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/workspaces/${workspace?.id}/invite-code`);

            onOpen("invite", { workspace: response.data});
            toast.info("Generated a new invite link");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const onChangePrivacy = async () => {
        try {
            if (workspace?.isPrivate === true) {
                setIsLoading(true);
                const response = await axios.patch(`/api/workspaces/${workspace?.id}/public`);
                onOpen("invite", { workspace: response.data});
                toast.info("Link privacy changed to public");
            } else if (workspace?.isPrivate === false) {
                setIsLoading(true);
                const response = await axios.patch(`/api/workspaces/${workspace?.id}/private`);
                onOpen("invite", { workspace: response.data});
                toast.info("Link privacy changed to private");
            }
            
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
                        <RefreshCw className="w-4 h-4 mr-2"/>
                        Generate a new link
                    </Button>
                    <Button
                    onClick={onChangePrivacy}
                    disabled={isLoading} 
                    variant="link"
                    size="sm"
                    className="text-xs text-zinc-500 mt-4"
                    >
                        <LockKeyholeIcon className="w-4 h-4 mr-2"/>
                        {workspace?.isPrivate === true ? "Make public" : "Make private"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}