import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ProjectChat } from "@prisma/client";


export async function GET(
    req: Request
) {
    try {
        const user = await currentUser();
        const { searchParams } = new URL(req.url);

        const cursor = searchParams.get("cursor");
        const projectId = searchParams.get("projectId");

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!projectId) {
            return new NextResponse("Project ID missing", { status: 400 });
        }

        let messages: ProjectChat[] = [];

        if (cursor) {
            messages = await db.projectChat.findMany({
                take: 5,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where: {
                    projectId
                },
                include: {
                    member: {
                        include: {
                            user: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        } else {
            messages = await db.projectChat.findMany({
                take: 5,
                where: {
                    projectId
                },
                include: {
                    member: {
                        include: {
                            user: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        }

        let nextCursor = null;

        if (messages.length === 5) {
            nextCursor = messages[5 - 1].id;
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        });

    } catch (error) {
        console.log("MESSAGES GET ERROR", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}