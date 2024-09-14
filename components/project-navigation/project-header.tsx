"use client";

import { ProjectWithMembers } from "@/types";
import { MemberRole } from "@prisma/client";

interface ProjectHeaderProps {
    project: ProjectWithMembers;
    role?: MemberRole;
}

export const ProjectHeader = ({
    project,
    role
}: ProjectHeaderProps) => {
    const isAdmin = role === MemberRole.ADMIN;
    
    return (
        <div>
            <div className="text-2xl">
                Project Name: {project.name}
            </div>

            {isAdmin && (
                <div className="text-md text-slate-700">
                    Invite Members
                    Project Settings
                    Manage Members
                </div>
            )}
        </div>
    )
}