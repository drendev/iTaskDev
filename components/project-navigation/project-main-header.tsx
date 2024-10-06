import { ProjectWithMembers } from "@/types"
import { Workspace } from "@prisma/client";

interface ProjectHeaderLayoutProps {
    project: Workspace;
}

export const ProjectHeaderLayout = ({
    project
}: ProjectHeaderLayoutProps) => {
    return (
        <div className="text-lg md:text-xl lg:text-3xl my-5 font-semibold">
            {project.name}
        </div>
    )
}