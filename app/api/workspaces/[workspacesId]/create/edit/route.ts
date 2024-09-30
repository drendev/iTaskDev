
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(
    req: Request,
    { params }: { params: { workspacesId: string } }
) {
    try {
        const user = await currentUser();

        const {
            description,
            dueDate,
            complexFeatures,
            clientInvolvement,
            deployment,
            testing,
            scope,
            members,
        } = await req.json();

        if (!user) {
            return new NextResponse("User is required", { status: 400 });
        }

       const projectInformation = await db.projectInformation.update({
        where: {
            workspaceId: params.workspacesId,
        },
        data: {
            description,
            dueDate,
            complexFeatures,
            clientInvolvement,
            deployment,
            testing,
            members,
            scope
        }
       })
        
        return NextResponse.json(projectInformation);
    } catch (error) {
        console.log("[WORKSPACE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}