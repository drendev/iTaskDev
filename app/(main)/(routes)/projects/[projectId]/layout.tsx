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
            <div className="w-full h-32 p-5 bg-gray-400 rounded-md shadow-xl"></div>
            <MemberList projectId={params.projectId} />
            {children}
        </div>
    )
}

export default ProjectIdLayout;