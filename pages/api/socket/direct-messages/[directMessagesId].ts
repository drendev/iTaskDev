import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if (req.method !== "DELETE" && req.method !== "PATCH") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const {  memberId, directMessagesId, conversationId } = req.query;
        const { content } = req.body;

        if(!memberId) {
            return res.status(401).json({ error: "No ID" });
        }

        if(!conversationId) {
            return res.status(401).json({ error: "Conversation ID Missing" });
        }
        
        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
                OR: [
                    {
                        userOne: {
                            id: memberId as string
                        },
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
                userTwo: true,
            }
        });

        if (!conversation) {
            console.log(conversation)
            return res.status(404).json({ error: "Conversation not found" });
        }

        const member = conversation.userOne.id === memberId ? conversation.userOne : conversation.userTwo;

        if (!member) {
            console.log("MEMBER")
            return res.status(404).json({ error: "Member Not Found" });
        }

        let directMessage = await db.directMessage.findFirst({
            where: {
                id: directMessagesId as string,
                conversationId: conversationId as string
            },
            include: {
                user: true
            }
        })

        if (!directMessage || directMessage.deleted) {
            console.log("DELETED")
            return res.status(404).json({ error: "Message Not Found" });
        }

        const isMessageOwner = directMessage.userId === member.id;
        const canModify = isMessageOwner;

        if (!canModify) {
            return res.status(401).json({ error: "You cant modify" });
        }

        if (req.method === "DELETE") {
            directMessage = await db.directMessage.update({
                where: {
                    id: directMessagesId as string
                },
                data: {
                    fileUrl: null,
                    content: "This message has been deleted",
                    deleted: true
                },
                include: {
                    user: true
                }
            })
        }

        if (req.method === "PATCH") {
            if (!isMessageOwner) {
                return res.status(401).json({ error: "Not message Owner" });
            }

            directMessage = await db.directMessage.update({
                where: {
                    id: directMessagesId as string
                },
                data: {
                    content,
                },
                include: {
                    user: true
                }
            })
        }
        
        const updateKey = `chat:${conversation.id}:messages:update`;

        res?.socket?.server?.io?.emit(updateKey, directMessage);

        return res.status(200).json(directMessage);
    } catch (error) {
        console.log("MESSAGE_ID", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}