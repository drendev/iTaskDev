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
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ProjectWithPending } from "@/types";
import { UserAvatar } from "@/app/(invite)/(routes)/pending/_components/user-avatar";
import { GoCheckCircle } from "react-icons/go";
import { GoXCircle } from "react-icons/go";



export const PendingModal = () => {
    const user = useCurrentUser();
    const router = useRouter();

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const { workspace } = data as { workspace: ProjectWithPending};

    const [loadingId, setLoadingId] = useState("");
    const [loadingDeleteId, setLoadingDeleteId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = isOpen && type === "pending";

    const onApprove = async (pendingId: string, name: any) => {
        try {
            setLoadingId(pendingId);
            setIsLoading(true);
            const response = await axios.patch(`/api/workspaces/${workspace.id}/pending`, { pendingId });

            router.refresh();
            onOpen("pending", { workspace: response.data });
            toast.success(`${name} has been approved`);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        } finally {
            setLoadingId("");
            setIsLoading(false);
        }
    }

    const onDecline = async (pendingId: string, name: any) => {
        try {
            setLoadingDeleteId(pendingId);
            setIsLoading(true);
            const response = await axios.delete(`/api/workspaces/${workspace.id}/pending`, { data: { pendingId } });

            router.refresh();
            onOpen("pending", { workspace: response.data });
            toast.success(`${name} has been declined`);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        } finally {
            setLoadingId("");
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-4 overflow-hidden">
                <DialogHeader className="px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Pending Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {workspace?.pending?.length} pending approval
                    </DialogDescription>
                </DialogHeader>
                    {workspace?.pending?.map((pending) => (
                        <div key={pending.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={pending.user.image || ""} />
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center">
                                    {pending.user.name}
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {pending.user.email}
                                </p>
                            </div>
                            <div className="ml-auto flex ">
                                <Button 
                                onClick={() => onApprove(pending.user.id, pending.user.name)}
                                disabled={isLoading}
                                variant="link"
                                >
                                    <div className="flex flex-col gap-y-1 items-center">
                                        {loadingId === pending.user.id 
                                        ? (<Loader2 className="animate-spin text-zinc-500 w-6 h-6" />) 
                                        : <GoCheckCircle className="w-6 h-6 text-green-700" />}
                                    <p className="text-[0.6rem] text-green-700">
                                        Approve
                                    </p>
                                    </div>
                                </Button>
                                <Button
                                onClick={() => onDecline(pending.user.id, pending.user.name)}
                                variant="link"
                                disabled={isLoading}
                                >
                                    <div className="flex flex-col gap-y-1 items-center">
                                    {loadingDeleteId === pending.user.id
                                    ? (<Loader2 className="animate-spin text-zinc-500 w-6 h-6" />)
                                    : <GoXCircle className="w-6 h-6 text-red-700" />}
                                    <p className="text-[0.6rem] text-red-700">
                                        Decline
                                    </p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    ))}
            </DialogContent>
        </Dialog>
    )
}