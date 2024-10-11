import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { workspacesId: string } }
) {
    try {
        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { tasks } = await req.json();

        if (!Array.isArray(tasks) || !params.workspacesId) {
            return new NextResponse("Bad Request", { status: 400 });
        }

        const assignTasks = await Promise.all(
            tasks.map(async (task) => {
                const { taskId, members } = task;

                return db.task.update({
                    where: {
                        id: taskId,
                        projectId: params.workspacesId,
                    },
                    data: {
                        members: {
                            createMany: {
                                data: members.map((memberId: string) => ({
                                    memberId,
                                })),
                            },
                        },
                    },
                });
            })
        );

        return NextResponse.json(assignTasks);
    } catch (error) {
        console.error("[WORKSPACE_MEMBERS]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
