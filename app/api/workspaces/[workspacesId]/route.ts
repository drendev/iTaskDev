import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: {params: { workspacesId: string }}
) {
    try {
        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const project = await db.workspace.delete({
            where: {
                id: params.workspacesId,
                userId: user.id
            }
        })

        return NextResponse.json(project);
    } catch (error) {
        console.log("DELETE PROJECT ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: {params: { workspacesId: string }}
) {
    try {
        const user = await currentUser();
        const { name } = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const project = await db.workspace.update({
            where: {
                id: params.workspacesId,
                userId: user.id
            },
            data: {
                name
            }
        })

        return NextResponse.json(project);
    } catch (error) {
        console.log("SERVER ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

