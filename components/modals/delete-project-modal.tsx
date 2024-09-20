"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
import axios from "axios";
import { useRouter } from "next/navigation";

export const DeleteProjectModal = () => {

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "deleteProject";
    const { workspace } = data;
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        setIsLoading(true);
        try {
            setIsLoading(false);
            await axios.delete(`/api/workspaces/${workspace?.id}`);

            toast.success(`You deleted ${workspace?.name} permanently.`);
            onClose();
            router.refresh();
            router.push("/projects");
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-4">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Project
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Permanently delete <span className="font-semibold text-slate-600">{workspace?.name}</span>?
                        <p className="text-xs mt-2 text-red-600">
                            This action cannot be undone and all data will be deleted permanently.
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                        disabled={isLoading}
                        onClick={onClose}
                        variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                        disabled={isLoading}
                        onClick={onClick}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}