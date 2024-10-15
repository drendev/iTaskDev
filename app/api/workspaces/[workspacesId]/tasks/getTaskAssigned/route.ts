import TaskList from "@/app/(main)/(routes)/projects/[projectId]/tasks/page";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { workspacesId: string } }
) {
  try {
    const createdTasks = await req.json();
    console.log("CreatedTasks: ", createdTasks);

    if (!params.workspacesId) {
      return new NextResponse("Not Found", { status: 400 });
    }

    const assignTasks = await db.task.findMany({
      where: {
        id: {
          in: createdTasks.map((task: any) => task.task), // Mapping to extract the `id`
        },
        projectId: params.workspacesId,
      },
      include: {
        members: {
          include: {
            member: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    console.log("assigntasks", assignTasks);

    const fullInfo = assignTasks.map((task) => {
      return {
        taskContent: task.content,
        taskIntensity: task.Intensity,
        taskDateDue: task.DateDue,
        members: task.members.map((members) => {
          return {
            username: members.member.user.name,
            avatar: members.member.user.image,
          };
        }),
      };
    });

    return NextResponse.json(fullInfo);
  } catch (error) {
    console.log("[WORKSPACE_MEMBERS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
