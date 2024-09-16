
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ProjectHeader } from "./project-header";

interface MemberListProps {
    projectId: string;
}

export const MemberList = async ({
    projectId
}: MemberListProps) => {
    const user = await currentUser();

    if(!user) {
        return redirect("/");
    }

    const project = await db.workspace.findUnique({
        where: {
            id: projectId
        },
        include: {
            members: {
                include: {
                    user: true
                },
                orderBy: {
                    role: "asc"
                },
            },
            pending: {
                include: {
                    user: true
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        },
    })

    
    const members = project?.members.filter((member) => member.userId !== user.id);

    if(!project) {
        return redirect("/unauthorized");
    }

    const role = project.members.find((member) => member.userId == user.id)?.role;

    return (
        <div>
            <ProjectHeader
            project={project}
            role={role}
            pending={project}
            />
        </div>
    )
}