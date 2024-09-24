
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {

    try {
        const url = new URL(req.url);

        const { content, fileUrl } = await req.json();

        const projectId = url.searchParams.get('projectId');
        const memberId = url.searchParams.get('memberId');

        if(!memberId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if(!projectId) {
            return NextResponse.json({ error: "Project ID Missing" }, { status: 400 });
        }

        if(!content) {
            return NextResponse.json({ error: "Content Missing" }, { status: 400 });
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
            return NextResponse.json({ error: "Project Not Found" }, { status: 404 });
        }

        const member = project.members.find((member) => member.userId === memberId);

        if (!member) {
            return NextResponse.json({ error: "Member Not Found" }, { status: 404 });
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
        
        return NextResponse.json(message, { status: 200 });
    } catch (error) {
        console.log("MESSAGES_POST", error);
        return NextResponse.json({ error: "Internal Server error" }, { status: 500 });
    }
}