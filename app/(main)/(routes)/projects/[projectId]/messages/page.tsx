import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ConversationHeader } from "@/components/conversation/conversation-header";
import { ChatInput } from "@/components/conversation/chat-input";

interface ProjectMessagesPageProps {
    params: {
        projectId: string;
    }
}

const ProjectMessagesPage = async ({
    params
}: ProjectMessagesPageProps) => {
    const user = await currentUser();

    if (!user) {
        redirect("/auth/login")
    }

    const project = await db.workspace.findUnique({
        where: {
            id: params.projectId
        }
    });

    const member = await db.member.findFirst({
        where: {
            workspaceId: params.projectId,
            userId: user.id
        }
    })

    if (!project || !member) {
        redirect("/");
    }

    return (
        <div className="flex flex-col h-full">
            <ConversationHeader 
            type="Project Members Chat"
            />
            <div className="flex-1">
                Future Messages
            </div>
            <ChatInput 
            type="Project Members Chat"
            apiUrl="/api/socket/messages"
            name={project.name}
            query={{
                projectId: params.projectId,
                memberId: user.id
            }}
            />
        </div>
    )
}

export default ProjectMessagesPage;