import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MembersFormPage } from "./manage/_components/members-form";

interface MembersPageProps {
    params: {
        projectId: string;
    }
}

const MembersPage = async ({
    params
}: MembersPageProps) => {
    const user = await currentUser();

    if (!user ) {
        redirect("/auth/login");
    }

    const project = await db.workspace.findUnique({
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
    
    if (!project) {
        return redirect("/unauthorized");
    }

    return (
        <div>
            <MembersFormPage 
            project={project}
            />
        </div>
    )
}

export default MembersPage;