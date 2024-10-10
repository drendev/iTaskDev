import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { Task } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const user = await currentUser();
    const tasks = await req.json();

    const CreatedTasksUpdated: Task[] = [];

    console.log(tasks);

    if (!user) {
      return new NextResponse("User is required", { status: 400 });
    }

    // Use Promise.all correctly
    const taskRes = await Promise.all(
      tasks.tasks.map(async (task: any) => {
        const updatedIntensity = await db.task.update({
          where: {
            projectId: params.projectId,
            id: task.id,
          },
          data: {
            Intensity: task.intensity,
          },
        });

        CreatedTasksUpdated.push(updatedIntensity);
      })
    );



    return NextResponse.json(CreatedTasksUpdated);
  } catch (error) {
    console.log("[WORKSPACE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
