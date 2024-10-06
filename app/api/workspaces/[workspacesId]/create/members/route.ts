
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    { params }: { params: { workspacesId: string } }
) {
    try {

        if (!params.workspacesId) {
            return new NextResponse("Not Found", { status: 400 });
        }

        const project = await db.workspace.findUnique({
            where: {
                id: params.workspacesId,
            },
            include: {
                members: {
                    include: {
                        user: true
                    }
                },
                pending: {
                    include: {
                        user: true
                    }
                }
            }
        });

        if (!project) {
            return new NextResponse("Project Not Found", { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        console.log("[WORKSPACE_MEMBERS]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}