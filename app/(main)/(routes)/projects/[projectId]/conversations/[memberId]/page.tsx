import { ConversationHeader } from "@/components/conversation/conversation-header";
import { currentUser } from "@/lib/auth";
import { getOrCreateConversation } from "@/lib/conversation";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        memberId: string;
        projectId: string;
    }
}

const MemberIdPage = async ({
    params
}: MemberIdPageProps) => {
    const user = await currentUser();

    if (!user) {
        redirect("/auth/login");
    }

    const currentMember = await db.member.findFirst({
        where: {
            workspaceId: params.projectId,
            userId: user.id
        },
        include: {
            user: true
        },
    })

    if (!currentMember) {
        redirect("/projects");
    }

    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

    if (!conversation) {
        return redirect(`/projects/${params.projectId}`);
    }

    const { memberOne, memberTwo } = conversation;

    const otherMember = memberOne.userId === user.id ? memberTwo : memberOne;

    return (
        <div className="flex flex-col h-ful">
            <ConversationHeader
            imageUrl={otherMember.user.image}
            name={otherMember.user.name}
            projectId={params.projectId}
            type="direct"
            />
        </div>
    )
}

export default MemberIdPage;