
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { directMessagesId: string } }
) {

    try {
        const url = new URL(req.url);

        const conversationId = url.searchParams.get('conversationId');
        const memberId = url.searchParams.get('memberId');

        if(!memberId) {
            return NextResponse.json({ error: "Member Id Missing" }, { status: 401 });
        }

        if(!conversationId) {
            return NextResponse.json({ error: "Conversation Id Missing" }, { status: 401 });
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
            return NextResponse.json({ error: "Conversation Not Found" }, { status: 404 });
        }

        const member = conversation.userOne.id === memberId ? conversation.userOne : conversation.userTwo;

        if (!member) {
            console.log("MEMBER")
            return NextResponse.json({ error: "Member Not Found" }, { status: 404 });
        }

        let directMessage = await db.directMessage.findFirst({
            where: {
                id: params.directMessagesId,
                conversationId: conversationId as string
            },
            include: {
                user: true
            }
        })

        if (!directMessage || directMessage.deleted) {
            console.log("DELETED")
            return NextResponse.json({ error: "Message Not Found" }, { status: 404 });
        }

        const isMessageOwner = directMessage.userId === member.id;
        const canModify = isMessageOwner;

        if (!canModify) {
            return NextResponse.json({ error: "You cannot modify" }, { status: 401 });
        }

            directMessage = await db.directMessage.update({
                where: {
                    id: params.directMessagesId
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

/*         if (req.method === "PATCH") {
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
 */
        return NextResponse.json(directMessage, { status: 200 });
    } catch (error) {
        console.log("MESSAGE_ID", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { directMessagesId: string } }
) {

    try {
        const url = new URL(req.url);

        const { content } = await req.json();

        const conversationId = url.searchParams.get('conversationId');
        const memberId = url.searchParams.get('memberId');

        if(!memberId) {
            return NextResponse.json({ error: "Member Id Missing" }, { status: 401 });
        }

        if(!conversationId) {
            return NextResponse.json({ error: "Conversation Id Missing" }, { status: 401 });
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
            return NextResponse.json({ error: "Conversation Not Found" }, { status: 404 });
        }

        const member = conversation.userOne.id === memberId ? conversation.userOne : conversation.userTwo;

        if (!member) {
            console.log("MEMBER")
            return NextResponse.json({ error: "Member Not Found" }, { status: 404 });
        }

        let directMessage = await db.directMessage.findFirst({
            where: {
                id: params.directMessagesId,
                conversationId: conversationId as string
            },
            include: {
                user: true
            }
        })

        if (!directMessage || directMessage.deleted) {
            console.log("DELETED")
            return NextResponse.json({ error: "Message Not Found" }, { status: 404 });
        }

        const isMessageOwner = directMessage.userId === member.id;
        const canModify = isMessageOwner;

        if (!canModify) {
            return NextResponse.json({ error: "You cannot modify" }, { status: 401 });
        }


            if (!isMessageOwner) {
                return NextResponse.json({ error: "Not Message Owner" }, { status: 401 });
            }

            directMessage = await db.directMessage.update({
                where: {
                    id: params.directMessagesId as string
                },
                data: {
                    content,
                },
                include: {
                    user: true
                }
            })

        return NextResponse.json(directMessage, { status: 200 });
    } catch (error) {
        console.log("MESSAGE_ID", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}