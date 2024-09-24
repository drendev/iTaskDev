
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { messagesId: string } }
) {

    try {
        const url = new URL(req.url);


        const memberId = url.searchParams.get('memberId');
        const projectId = url.searchParams.get('projectId');

        if(!memberId) {
            return NextResponse.json({ error: "Member Id Missing" }, { status: 401 });
        }

        if(!projectId) {
            return NextResponse.json({ error: "Project Id Missing" }, { status: 401 });
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
            return NextResponse.json({ error: "Project Not Found" }, { status: 404 });
        }

        const member = project.members.find((member) => member.userId === memberId);

        if (!member) {
            return NextResponse.json({ error: "mmember Not Found" }, { status: 404 });
        }

        let message = await db.projectChat.findFirst({
            where: {
                id: params.messagesId,
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
            return NextResponse.json({ error: "Message Not Found" }, { status: 404 });
        }

        const isMessageOwner = message.memberId === member.id;
        const isAdmin = member.role === MemberRole.ADMIN;
        const canModify = isMessageOwner || isAdmin;

        if (!canModify) {
            return NextResponse.json({ error: "You cant modify" }, { status: 401 });

        }

            message = await db.projectChat.update({
                where: {
                    id: params.messagesId
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

        return NextResponse.json(message, { status: 200 });
    } catch (error) {
        console.log("MESSAGE_ID", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { messagesId: string } }
) {

    try {
        const url = new URL(req.url);

        const { content } = await req.json();
        
        const memberId = url.searchParams.get('memberId');
        const projectId = url.searchParams.get('projectId');

        if(!memberId) {
            return NextResponse.json({ error: "Member Id Missing" }, { status: 401 });
        }

        if(!projectId) {
            return NextResponse.json({ error: "Project Id Missing" }, { status: 401 });
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
            return NextResponse.json({ error: "Project Not Found" }, { status: 404 });
        }

        const member = project.members.find((member) => member.userId === memberId);

        if (!member) {
            return NextResponse.json({ error: "mmember Not Found" }, { status: 404 });
        }

        let message = await db.projectChat.findFirst({
            where: {
                id: params.messagesId,
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
            return NextResponse.json({ error: "Message Not Found" }, { status: 404 });
        }

        const isMessageOwner = message.memberId === member.id;
        const isAdmin = member.role === MemberRole.ADMIN;
        const canModify = isMessageOwner || isAdmin;

        if (!canModify) {
            return NextResponse.json({ error: "You cant modify" }, { status: 401 });

        }

            message = await db.projectChat.update({
                where: {
                    id: params.messagesId as string
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

        return NextResponse.json(message, { status: 200 });
    } catch (error) {
        console.log("MESSAGE_ID", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
