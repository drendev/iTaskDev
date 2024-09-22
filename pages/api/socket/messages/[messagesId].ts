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
        const { messagesId, projectId, memberId } = req.query;
        const { content } = req.body;

        if(!memberId) {
            return res.status(401).json({ error: "No ID" });
        }

        if(!projectId) {
            return res.status(401).json({ error: "Project ID Missing" });
        }
        
        const project = await db.workspace.findFirst({
            where: {
                id: projectId as string,
                members: {
                    some: {
                        userId: memberId as string
                    }
                }
            },
            include: {
                members: true
            }
        })

        if(!project) {
            return res.status(404).json({ error: "Project Not Found" });
        }

        const member = project.members.find((member) => member.userId === memberId);

        if (!member) {
            return res.status(404).json({ error: "Member Not Found" });
        }

        let message = await db.projectChat.findFirst({
            where: {
                id: messagesId as string,
                projectId: projectId as string
            },
            include: {
                member: {
                    include: {
                        user: true
                    }
                }
            }
        })

        if (!message || message.deleted) {
            return res.status(404).json({ error: "Message Not Found" });
        }

        const isMessageOwner = message.memberId === member.id;
        const isAdmin = member.role === MemberRole.ADMIN;
        const canModify = isMessageOwner || isAdmin;

        if (!canModify) {
            return res.status(401).json({ error: "You cant modify" });
        }

        if (req.method === "DELETE") {
            message = await db.projectChat.update({
                where: {
                    id: messagesId as string
                },
                data: {
                    fileUrl: null,
                    content: "This message has been deleted",
                    deleted: true
                },
                include: {
                    member: {
                        include: {
                            user: true
                        }
                    }
                }
            })
        }

        if (req.method === "PATCH") {
            if (!isMessageOwner) {
                console.log("MESSAGE_ID", message.memberId, member.id);
                return res.status(401).json({ error: "Not message Owner" });
            }

            message = await db.projectChat.update({
                where: {
                    id: messagesId as string
                },
                data: {
                    content,
                },
                include: {
                    member: {
                        include: {
                            user: true
                        }
                    }
                }
            })
        }
        
        const updateKey = `chat:${projectId}:messages:update`;

        res?.socket?.server?.io?.emit(updateKey, message);

        return res.status(200).json(message);
    } catch (error) {
        console.log("MESSAGE_ID", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}