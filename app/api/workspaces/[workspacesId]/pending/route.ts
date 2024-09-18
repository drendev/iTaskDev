
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function PATCH(
    req: Request,
    { params }: { params: { workspacesId: string } }
) {
    try {
        const user = await currentUser();
        const { pendingId } = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized" ,{ status: 401 });
        }

        if (!params.workspacesId) {
            return new NextResponse("Workspace ID missing", { status: 400 });
        }

        if (!pendingId) {
            return new NextResponse("Member ID missing", { status: 400 });
        }

        const memberApprove = await db.workspace.update({
            where: {
                id: params.workspacesId,
                userId: user.id
            },
            data: {
                members: {
                    create: [
                        {
                            userId: pendingId
                        }
                    ]
                },
                pending: {
                    deleteMany: {
                        userId: pendingId
                    }
                }
            },
            include: {
                pending: {
                    include: {
                        user: true
                    }
                }
            }
        })
        
        return NextResponse.json(memberApprove);
        
    } catch (error) {
        console.log("[WORKSPACE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { workspacesId: string } }
) {
    try {
        const user = await currentUser();
        const { pendingId } = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized" ,{ status: 401 });
        }

        if (!params.workspacesId) {
            return new NextResponse("Workspace ID missing", { status: 400 });
        }

        if (!pendingId) {
            return new NextResponse("Member ID missing", { status: 400 });
        }

        const memberReject = await db.workspace.update({
            where: {
                id: params.workspacesId,
                userId: user.id
            },
            data: {
                pending: {
                    deleteMany: {
                        userId: pendingId
                    }
                }
            },
            include: {
                pending: {
                    include: {
                        user: true
                    }
                }
            }
        })
        
        return NextResponse.json(memberReject);
        
    } catch (error) {
        console.log("[WORKSPACE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}