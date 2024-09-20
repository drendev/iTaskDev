"use client";

import { ProjectWithMembers, ProjectWithPending } from "@/types";
import { MemberRole } from "@prisma/client";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { GoPencil, GoPerson, GoPersonAdd, GoPlusCircle, GoTrash } from "react-icons/go";
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
            <div className="text-slate-700 ">
            {isAdmin && (
                <div className="space-x-3">
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
                    <Button
                    size="sm"
                    onClick={() => onOpen("members", { workspace: project })}
                    >
                        <GoPerson className="w-4 h-4 mr-2"/>
                        Manage Members
                    </Button>

                    <Button
                    size="sm"
                    onClick={() => onOpen("editProject", { workspace: project })}
                    >
                        <GoPencil className="w-4 h-4 mr-2"/>
                        Edit Project
                    </Button>
                    <Button
                    size="sm"
                    onClick={() => onOpen("deleteProject", { workspace: project })}
                    >
                        <GoTrash className="w-4 h-4 mr-2"/>
                        Delete Project
                    </Button>
                </div>
            )}
            {!isAdmin && (
                <div>
                    <Button
                    size="sm"
                    onClick={() => onOpen("leaveProject", { workspace: project })}
                    >
                        <GoPencil className="w-4 h-4 mr-2"/>
                        Leave Project
                    </Button>
                </div>
            )}
            </div>
        </div>
    )
}