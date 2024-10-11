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

    const getTasks = await db.member.findMany({
        where: {
            workspaceId: params.projectId
        },
        include: {
            user: true,
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

    const taskPerMember = getTasks.map((member) => {
        return {
            memberName: member.user.name,
            tasks: member.tasks.map((taskEntry) => taskEntry.task.content),
            tasksMember: member.tasks.map((taskMembers) => taskMembers.member.user)
        };
    });
    
    return (
        <>
{/*             <ManageMembersWorkloadForm members={projectMembers} /> */}
        </>
    )
}

export default ManageMembersWorkload;