"use client";

import axios from "axios";
import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

export const CreateProjectModal = () => {
    const user = useCurrentUser();

    const { isOpen, onClose, type } = useModal();
    const [ name, setName ] = useState("");

    const router = useRouter();

    const isModalOpen = isOpen && type === "createProject";

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post("/api/workspaces", { name, userId: user?.id });
            router.refresh();
            onClose();
            setName("");
        } catch (error) {
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
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Create a new project to start collaborating with your team.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input 
                        disabled={false}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Project Name"
                        required
                    />

                    <Button type="submit" className="w-full" size="lg" disabled={false} >
                        Create Project
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}