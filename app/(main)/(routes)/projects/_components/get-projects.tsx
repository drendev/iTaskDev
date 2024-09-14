import { NavigationAction } from "@/components/project-navigation/add-project";
import { ProjectList } from "@/components/project-navigation/project-list";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const getProjects = async () => {
    const user = await currentUser();

    if(!user) {
        return redirect("/");
    }

    const projects = await db.workspace.findMany({
        where: {
            members: {
                some: {
                    userId: user.id
                }
            }
        },
    })

    return (
        <div>
            <NavigationAction />
            {projects.map((project) => (
                <div key={project.id}>
                    <ProjectList 
                        id={project.id}
                        name={project.name}
                    />
                </div>
            ))}
        </div>
    )
}