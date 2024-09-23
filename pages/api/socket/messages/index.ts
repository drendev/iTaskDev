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
        const { projectId, memberId } = req.query;

        if(!memberId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if(!projectId) {
            return res.status(400).json({ error: "Project ID Missing" });
        }

        if(!content) {
            return res.status(400).json({ error: "Content Missing" });
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
        });
        
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        const member = project.members.find((member) => member.userId === memberId);

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        const message = await db.projectChat.create({
            data: {
                content,
                projectId: projectId as string,
                fileUrl,
                memberId: member.id,
            },
            include: {
                member: {
                    include: {
                        user: true
                    }
                }
            }
        });

        const projectKey = `chat:${projectId}:messages`;

        res?.socket?.server?.io?.emit(projectKey, message);
        
        return res.status(200).json(message);
    } catch (error) {
        console.log("MESSAGES_POST", error);
        return res.status(500).json({ message: "Internal Server Error taenma" });
    }
}