import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { RenderRepositoryDetails } from "./_components/render-repository-details";

interface RepositoryPageProps {
    params: {
        projectId: string;
    }
}

export default async function RepositoryPage({
    params
}: RepositoryPageProps) {
    const user = await currentUser();

    if (!user) {
        redirect("/auth/login");
    }

    const repository = await db.workspace.findUnique({
        where: {
            id: params.projectId,
        },
        select: {
            repo: true,
            owner: true,
        }
    });

    if (!repository) {
        return null; // TODO
    }

    if (!repository.repo || !repository.owner) {
        return null; // TODO
    }

    return(
        <div>
            <RenderRepositoryDetails
            projectId={params.projectId}
            repo={repository.repo}
            owner={repository.owner}
            />
        </div>
    )
}