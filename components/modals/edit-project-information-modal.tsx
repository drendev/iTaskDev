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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ProjectWithInformation } from "@/types";

export const EditProjectInformationModal = () => {
    const user = useCurrentUser();

    const { isOpen, onClose, type, data } = useModal();
   
    const [loading, setLoading] = useState<boolean>(false);
    
    const router = useRouter();

    const { workspace } = data as { workspace: ProjectWithInformation};
    const [ name, setName ] = useState("");
    const isModalOpen = isOpen && type === "editProject";

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name) {
            toast.error("Project Name is required");
            return;
        } else if (name.length < 12) {
            toast.error("Project Name must be at least 12 characters");
            return;
        } else if (name.length > 80) {
            toast.error("Maximum of 80 characters allowed for Project Name");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.patch(`/api/workspaces/${workspace?.id}`, { name, userId: user?.id });
            if (response) {
                setLoading(false);
                router.push(`/projects/${response.data.id}`);
                setName("");
                toast.error("Project Name Successfully Updated");
                onClose();
                router.refresh();
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleClose = () => {
        onClose();
        setName("");
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-4 overflow-hidden">
                <DialogHeader className="px-6">
                    <DialogTitle>Edit Project</DialogTitle>
                    <DialogDescription>
                        Create a new project to start collaborating with your team.
                    </DialogDescription>
                </DialogHeader>
                
                    <Button type="submit" className="w-full" size="lg" disabled={false}>
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                        <>
                            Save
                        </>
                        )}
                    </Button>
                    
            </DialogContent>
        </Dialog>
    )
}