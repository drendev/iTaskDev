
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
        
        const { content } = await req.json();

        if (!user) {
            return new NextResponse("User is required", { status: 400 });
        }

        const task = await db.task.create({
            data: {
                content,
                projectId: params.workspacesId,
            }
        });

        return NextResponse.json(task);
    } catch (error) {
        console.log("[CREATE TASK ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}