import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { workspacesId: string } }
) {
    try {
        const user = await currentUser();

        if(!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!params.workspacesId) {
            return new NextResponse("Project ID Missing", { status: 400 });
        }

        const project = await db.workspace.update({
            where: {
                id: params.workspacesId,
                userId: {
                    not: user.id
                },
                members: {
                    some: {
                        userId: user.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        userId: user.id
                    }
                }
            }
        });

        return NextResponse.json(project);
    } catch (error) {
        console.log("LEAVE PROJECT ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}