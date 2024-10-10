import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ManageMembersWorkloadForm } from "../_components/manage-member-form";

interface ManageMembersWorkloadProps {
    params: {
        projectId: string;
    }
}

const ManageMembersWorkload = async ({
    params,
}: ManageMembersWorkloadProps) => {
    const user = await currentUser();

    if (!user) {
        redirect("/auth/login");
    }

    const projectMembers = await db.workspace.findUnique({
        where: {
            id: params.projectId,
            userId: user.id
        },
        include: {
            members: {
                include: {
                    user: true
                }
            }
        }
    });

    if (!projectMembers) {
        redirect("/unauthorized");
    }

/*     const getTasks = await db.member.findMany({
        where: {
            workspaceId: params.projectId
        },
        include: {
            tasks: {
                include: {
                    task: true,
                    member: {
                        include: {
                            user: true
                        }
                    }
                }
            },
        },
    });

    const taskspermember = getTasks.map((member) => {
        member.tasks.map((task) => {
            task.task.content
        })
    }); */

    return (
        <>
            <ManageMembersWorkloadForm members={projectMembers} />
        </>
    )
}

export default ManageMembersWorkload;