import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { workspacesId: string } }
) {
  try {
    const data = await req.json();
    console.log("data: ", data);

    const createdTasks = data.data;

    if (!params.workspacesId) {
      return new NextResponse("Not Found", { status: 400 });
    }

    const assignTasks = await Promise.all(
      createdTasks.map(async (task: any) => {
        return db.task.findMany({
          where: {
            id: task.task,
            projectId: params.workspacesId,
          },
          include: {
            members: true,
          },
        });
      })
    );

    console.log("assigntasks", assignTasks);

    return NextResponse.json("test");
  } catch (error) {
    console.log("[WORKSPACE_MEMBERS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
