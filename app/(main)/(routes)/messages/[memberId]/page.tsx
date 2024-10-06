import { ChatInput } from "@/components/conversation/chat-input";
import { ChatMessages } from "@/components/conversation/chat-messages";
import { ConversationHeader } from "@/components/conversation/conversation-header";
import { DirectMessages } from "@/components/conversation/direct-messages";
import { MediaRoom } from "@/components/media-room";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@/lib/auth";
import { getOrCreateConversation } from "@/lib/conversation";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        memberId: string;
    },
    searchParams: {
        video?: boolean;
    }
}

const MemberIdPage = async ({
    params,
    searchParams,
}: MemberIdPageProps) => {
    const user = await currentUser();

    if (!user?.id) {
        redirect("/auth/login");
    }

    const conversation = await getOrCreateConversation(user.id, params.memberId);

    const currentUserInfo = await db.user.findFirst({
        where: {
            id: user.id
        },
    })

    if (!currentUserInfo) {
        return redirect
    }

    if (!conversation) {
        return redirect(`/`);
    }

    const { userOne, userTwo } = conversation;

    const otherMember = userOne.id === user.id ? userTwo : userOne;

    return (
        <div className="flex flex-col h-[500px]">
            <ConversationHeader
            imageUrl={otherMember.image}
            name={otherMember.name}
            type="direct"
            />
        {searchParams.video && (
            <MediaRoom
            chatId={conversation.id}
            video={false}
            audio={true}
            />
        )}
        {!searchParams.video && (
            <>
            <ScrollArea className="max-h-[420px] h-full">
                <DirectMessages
                user={currentUserInfo}
                name={otherMember.name as string}
                chatId={conversation.id}
                type="direct"
                apiUrl="/api/direct-messages"
                paramKey="conversationId"
                paramValue={conversation.id}
                socketUrl="/api/polling/direct-messages"
                socketQuery={{
                    memberId: user.id,
                    conversationId: conversation.id
                }}
                />
                <ChatInput
                name={otherMember.name as string}
                type="direct"
                apiUrl="/api/polling/direct-messages"
                query={{
                conversationId: conversation.id,
                memberId: user.id
                }}
                />
            </ScrollArea>
            </>
        )}
        
        </div>
    )
}

export default MemberIdPage;