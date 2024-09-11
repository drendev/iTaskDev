
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { name, userId } = await req.json();

        if (!userId) {
            return new NextResponse("User is required", { status: 400 });
        }

        if(!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const workspace = await db.workspace.create({
            data: {
                userId: userId,
                name,
                joinCode: uuidv4(),
                members: {
                    create: [
                        { userId: userId, role: MemberRole.ADMIN }
                    ]
                }
            },
            
        })
        
        return NextResponse.json(workspace);
    } catch (error) {
        console.log("[WORKSPACE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}