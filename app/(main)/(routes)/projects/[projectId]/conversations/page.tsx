import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ConversationHeader } from "@/components/conversation/conversation-header";

interface ConversationsPageProps {
    params: {
        projectId: string;
    }
}

const ConversationsPage = async ({
    params
}: ConversationsPageProps) => {
    const user = await currentUser();

    const project = await db.workspace.findUnique({
        where: {
            id: params.projectId
        }
    })

    const member = await db.member.findFirst({
        where: {
            workspaceId: project?.id,
            userId: user?.id
        }
    });

    if(!member) {
        redirect("/projects");
    }


    if (!user) {
        redirect("/auth/login");
    }

    return (
        <div className="flex flex-col h-full">
            <ConversationHeader
            type="Project Members Chat"
            projectId={params.projectId}
            imageUrl=""
            />
        </div>
    )
}

export default ConversationsPage;