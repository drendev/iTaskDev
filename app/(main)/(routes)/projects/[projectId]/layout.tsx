import { MemberList } from "@/components/project-navigation/member-list";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ProjectIdLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params : { projectId: string }
}) => {
    const user = await currentUser();

    if (!user) {
        return redirect("/auth/signin");
    }

    const project = await db.workspace.findUnique({
        where: {
            id: params.projectId,
            members: {
                some: {
                    userId: user.id
                }
            }
        }
    })

    if (!project) {
        return redirect("/unauthorized");
    }


    return (
        <div className="h-full">
            <MemberList projectId={params.projectId} />
            {children}
        </div>
    )
}

export default ProjectIdLayout;