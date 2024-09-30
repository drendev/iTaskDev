import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ConversationHeader } from "@/components/conversation/conversation-header";
import { ChatInput } from "@/components/conversation/chat-input";
import { ChatMessages } from "@/components/conversation/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectMessagesPageProps {
  params: {
    projectId: string;
  };
}

const ProjectMessagesPage = async ({ params }: ProjectMessagesPageProps) => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const project = await db.workspace.findUnique({
    where: {
      id: params.projectId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      workspaceId: params.projectId,
      userId: user.id,
    },
  });

  if (!project || !member) {
    redirect("/");
  }

  return (
    <div className="flex flex-col h-[500px] ">
      <div className="">
        <ConversationHeader type="Project Members Chat" />
      </div>
      <div>
        {/*             <MediaRoom 
            chatId={project.id}
            video={false}
            audio={true}
            /> */}
        <ScrollArea className="max-h-[420px] h-full">
        <ChatMessages
          name={project.name}
          member={member}
          type="Project Members Chat"
          apiUrl="/api/messages"
          socketUrl="/api/polling/messages"
          socketQuery={{
            projectId: params.projectId,
            memberId: user.id,
          }}
          paramKey="projectId"
          paramValue={project.id}
          chatId={project.id}
        />
        </ScrollArea>
      </div>
      <ChatInput
        type="Project Members Chat"
        apiUrl="/api/polling/messages"
        name={project.name}
        query={{
          projectId: params.projectId,
          memberId: user.id,
        }}
      />
    </div>
  );
};

export default ProjectMessagesPage;
