import { currentUser } from "@/lib/auth";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { auth } from '@/auth';
import { db } from "@/lib/db";
import { currentUserPages } from "@/lib/current-user-pages";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {

        const { content, fileUrl } = req.body;
        const { conversationId, memberId } = req.query;

        if(!memberId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if(!conversationId) {
            return res.status(400).json({ error: "Conversation ID Missing" });
        }

        if(!content) {
            return res.status(400).json({ error: "Content Missing" });
        }


        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
                OR: [
                    {
                        userOne: {
                            id: memberId as string
                        }
                    },
                    {
                        userTwo: {
                            id: memberId as string
                        }
                    }
                ]
            },
            include: {
                userOne: true,
                userTwo: true
            }
        })

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        const member = conversation.userOne.id === memberId ? conversation.userOne : conversation.userTwo;

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        const message = await db.directMessage.create({
            data: {
                content,
                fileUrl,
                conversationId: conversationId as string,
                userId: member.id,
            },
            include: {
                user: true
            }
        });

        const projectKey = `chat:${conversationId}:messages`;

        res?.socket?.server?.io?.emit(projectKey, message);
        
        return res.status(200).json(message);
    } catch (error) {
        console.log("MESSAGES_POST", error);
        return res.status(500).json({ message: "Internal Server Error taenma" });
    }
}