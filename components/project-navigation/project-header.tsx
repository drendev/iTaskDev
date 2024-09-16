"use client";

import { ProjectWithMembers, ProjectWithPending } from "@/types";
import { MemberRole } from "@prisma/client";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { GoPersonAdd, GoPlusCircle } from "react-icons/go";
import { Badge } from "../ui/badge";

interface ProjectHeaderProps {
    project: ProjectWithMembers;
    role?: MemberRole;
    pending: ProjectWithPending;
}

export const ProjectHeader = ({
    project,
    role,
    pending
}: ProjectHeaderProps) => {
    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    
    return (
        <div>
            <div className="text-2xl">
                Project Name: {project.name}
            </div>

            {isAdmin && (
                <div className="text-slate-700 space-x-3">
                    <Button
                    size="sm"
                    onClick={() => onOpen("invite", { workspace: project })}
                    >
                        <GoPlusCircle className="w-4 h-4 mr-2"/>
                        Invite Members
                    </Button>
                    
                    <Button
                    className="relative"
                    size="sm"
                    onClick={() => onOpen("pending", { workspace: project })}
                    >
                    <GoPersonAdd className="w-4 h-4 mr-2"/>
                    Pending Approval {pending.pending.length > 0 && <Badge className="absolute -top-2 -right-2" variant="destructive">{pending.pending.length}</Badge>}
                    </Button>
                </div>
            )}
        </div>
    )
}