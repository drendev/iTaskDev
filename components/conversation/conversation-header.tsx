import { UserAvatar } from "@/app/(invite)/(routes)/pending/_components/user-avatar";
import { Hash } from "lucide-react";
import { SocketIndicator } from "@/components/socket-indicator";

interface ConversationHeaderProps {
    projectId?: string;
    type: "Project Members Chat" | "direct";
    imageUrl?: string | null;
    name?: string | null;
}

export const ConversationHeader = ({
    projectId,
    type,
    imageUrl,
    name
}: ConversationHeaderProps) => {
    return(
        <div className="text-md font-semibold px-3 flex items-center h-12 border-zinc-300 border-b-2">
            {type === "Project Members Chat" && (
                <>
                    <Hash className="h-5 w-5 mr-2 text-zinc-500"/>
                    {type}
                </>
            )}
            {type === "direct" && (
                <>
                <UserAvatar 
                src={imageUrl || ""}
                className="h-8 w-8 mr-2"
                />
                <p>
                    {name}
                </p>
                </>
            )}
            <div className="ml-auto flex items-center"> 
                <SocketIndicator />
            </div>
        </div>
    )
}