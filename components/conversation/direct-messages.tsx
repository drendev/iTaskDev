"use client";

import { Member, ProjectChat, User, DirectMessage } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment, useRef, ElementRef } from "react";
import { ChatItem } from "./chat-item";
import { format } from "date-fns";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { DirectChatItem } from "./direct-chat-item";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithUser = DirectMessage & {
    user: User;
}

interface ChatMessagesProps {
    name?: string;
    user: User;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, any>;
    paramKey: "projectId" | "conversationId";
    paramValue: string;
    type: "Project Members Chat" | "direct";
}

export const DirectMessages = ({
    name,
    user,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type
}: ChatMessagesProps) => {

    const queryKey = `chat:${chatId}`;

    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    });

    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0,
    })

    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500"> Loading messages...</p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
                <p className="text-xs text-zinc-500"> Something went wrong.</p>
            </div>
        )
    }

    return (
        <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
            {!hasNextPage && <div className="flex-1"/>}
            {!hasNextPage && (
            <ChatWelcome
            type={type}
            name={name}
            />
            )}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4"/>
                    ) : (
                        <button
                        onClick={() => fetchNextPage()}
                        className="text-zinc-500 hover:text-zinc-600 text-xs my-4 transition"
                        >
                            Load previous messages
                        </button>
                    )}
                </div>
            )}
            <div className="flex flex-col-reverse">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message: MessageWithUser) => (
            
                            <DirectChatItem
                            id={message.id}
                            key={message.id}
                            user={user}
                            content={message.content}
                            fileUrl={message.fileUrl}
                            deleted={message.deleted}
                            timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                            isUpdated={message.updatedAt !== message.createdAt}
                            socketUrl={socketUrl}
                            socketQuery={socketQuery}
                            />
                        ))}
                        
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef} />
        </div>
    )
}