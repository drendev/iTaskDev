"use client";

import { ProjectWithMembers } from "@/types";
import { MemberRole } from "@prisma/client";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";

interface ProjectHeaderProps {
    project: ProjectWithMembers;
    role?: MemberRole;
}

export const ProjectHeader = ({
    project,
    role
}: ProjectHeaderProps) => {
    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    
    return (
        <div>
            <div className="text-2xl">
                Project Name: {project.name}
            </div>

            {isAdmin && (
                <div className="text-slate-700">
                    <Button
                    size="sm"
                    onClick={() => onOpen("invite", { workspace: project })}
                    >
                        Invite Members
                    </Button>
                    Project Settings
                </div>
            )}
        </div>
    )
}