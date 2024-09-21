import { ConversationHeader } from "@/components/conversation/conversation-header";
import { currentUser } from "@/lib/auth";
import { getOrCreateConversation } from "@/lib/conversation";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        memberId: string;
    }
}

const MemberIdPage = async ({
    params
}: MemberIdPageProps) => {
    const user = await currentUser();

    if (!user?.id) {
        redirect("/auth/login");
    }

    const conversation = await getOrCreateConversation(user.id, params.memberId);

    if (!conversation) {
        return redirect(`/`);
    }

    const { userOne, userTwo } = conversation;

    const otherMember = userOne.id === user.id ? userTwo : userOne;

    return (
        <div className="flex flex-col h-ful">
            <ConversationHeader
            imageUrl={otherMember.image}
            name={otherMember.name}
            type="direct"
            />
        </div>
    )
}

export default MemberIdPage;