
import { NextResponse } from "next/server";
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

        if (!Array.isArray(content) || content.length === 0) {
            return new NextResponse("Content must be a non-empty array", { status: 400 });
        }

        const tasks = await Promise.all(
            content.map(async (taskData: { content: string }) => {
                return db.task.create({
                    data: {
                        content: taskData.content,
                        projectId: params.workspacesId,
                    },
                });
            })
        );

        return NextResponse.json(tasks);
    } catch (error) {
        console.log("[CREATE TASK ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
