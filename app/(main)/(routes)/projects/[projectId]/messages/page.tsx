import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ConversationHeader } from "@/components/conversation/conversation-header";
import { ChatInput } from "@/components/conversation/chat-input";
import { ChatMessages } from "@/components/conversation/chat-messages";

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
            <ChatMessages
            name={project.name}
            member={member}
            type="Project Members Chat"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
                projectId: params.projectId,
                memberId: user.id
            }}
            paramKey="projectId"
            paramValue={project.id}
            chatId={project.id}
            />

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