
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {

    try {
        const url = new URL(req.url);

        const { content, fileUrl } = await req.json();
        
        const conversationId = url.searchParams.get('conversationId');
        const memberId = url.searchParams.get('memberId');

        if(!memberId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if(!conversationId) {
            return NextResponse.json({ error: "Conversation ID Missing" }, { status: 400 });
        }

        if(!content) {
            return NextResponse.json({ error: "Content Missing" }, { status: 400 });
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
            return NextResponse.json({ error: "Conversation Not Found" }, { status: 404 });
        }

        const member = conversation.userOne.id === memberId ? conversation.userOne : conversation.userTwo;

        if (!member) {
            return NextResponse.json({ error: "Member Not Found" }, { status: 404 });
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
        
        return NextResponse.json(message, { status: 200 });
    } catch (error) {
        console.log("MESSAGES_POST", error);
        return NextResponse.json({ error: "Internal Server error" }, { status: 500 });
    }
}