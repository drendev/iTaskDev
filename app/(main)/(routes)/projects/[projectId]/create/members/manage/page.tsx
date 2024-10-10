import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

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
    })

    return (
        <>
            
        </>
    )
}

export default ManageMembersWorkload;