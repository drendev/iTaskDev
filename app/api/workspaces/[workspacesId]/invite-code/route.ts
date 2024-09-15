import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid';

export async function PATCH(
    req: Request,
    { params }: { params: { workspacesId: string } }
) {
    try {
        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.workspacesId) {
            return new NextResponse("Not Found", { status: 400 });
        }

        const project = await db.workspace.update({
            where: {
                id: params.workspacesId,
                userId: user.id
            },
            data: {
                joinCode: uuidv4()
            }
        })

        return NextResponse.json(project);
    } catch (error) {
        console.log("[WORKSPACE_ID]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}