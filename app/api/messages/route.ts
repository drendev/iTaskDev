import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ProjectChat } from "@prisma/client";

const MESSAGES_BATCH = 5;

export async function GET(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const projectId = searchParams.get("projectId");
        const cursor = searchParams.get("cursor");

        if (!projectId) {
            return new NextResponse("Project ID missing", { status: 400 });
        }

        const queryOptions: any = {
            take: MESSAGES_BATCH,
            where: { projectId },
            include: {
                member: {
                    include: {
                        user: true
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        };

        if (cursor) {
            queryOptions.skip = 1;
            queryOptions.cursor = { id: cursor };
        }

        const messages: ProjectChat[] = await db.projectChat.findMany(queryOptions);

        const nextCursor = messages.length === MESSAGES_BATCH ? messages[MESSAGES_BATCH - 1].id : null;

        return NextResponse.json({ items: messages, nextCursor });
    } catch (error) {
        console.error("MESSAGES GET ERROR", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
