import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function GET(
    req: Request,
) {
    try {
        const user = await currentUser();

        const { searchParams } = new URL(req.url);

        const taskId = searchParams.get("taskId");

        if (!taskId) {
            return new NextResponse("Task ID is required", { status: 400 })
        }

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const task = await db.task.findUnique({
            where: {
                id: taskId
            },
            include: {
                members: {
                    include: {
                        member: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(task);
    } catch (error) {
        console.log("[TASK_VIEW]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}