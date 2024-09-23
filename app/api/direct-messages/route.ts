import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { DirectMessage, ProjectChat } from "@prisma/client";

const MESSAGES_BATCH = 5;

export async function GET(
    req: Request
) {
    try {
        const user = await currentUser();
        const { searchParams } = new URL(req.url);

        const cursor = searchParams.get("cursor");
        const conversationId = searchParams.get("conversationId");

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!conversationId) {
            return new NextResponse("Conversation ID missing", { status: 400 });
        }

        let messages: DirectMessage[] = [];

        if (cursor) {
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where: {
                    conversationId
                },
                include: {
                    user: true
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        } else {
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                where: {
                    conversationId
                },
                include: {
                    user: true
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        }

        let nextCursor = null;

        if (messages.length === MESSAGES_BATCH) {
            nextCursor = messages[MESSAGES_BATCH - 1].id;
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        });

    } catch (error) {
        console.log("DIRECT MESSAGES GET ERROR", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}