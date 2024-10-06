"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
};

export const MediaRoom = ({
    chatId,
    video,
    audio
}: MediaRoomProps) => {
    const user = useCurrentUser();
    const [token, setToken] = useState("");
    
    useEffect(() => {
        if (!user?.name) return;

        const name = user.name;

        (async () => {
            try {
                const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
                const data = await resp.json();
                setToken(data.token);
            } catch (e) {
                console.log(e);
            }
        })();
    },[user?.name, chatId]);

    if (token === "") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 
                className="h-7 w-7 animate-spin text-zinc-500 my-4"
                />
                <p className="text-xs text-zinc-500">
                    Loading...
                </p>
            </div>
        )
    }

    return (
        <LiveKitRoom
        data-lk-theme="default"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        video={video}
        audio={audio}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}