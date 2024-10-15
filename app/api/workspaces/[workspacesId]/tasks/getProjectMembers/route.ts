import TaskList from "@/app/(main)/(routes)/projects/[projectId]/tasks/page";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { workspacesId: string } }
) {
  try {
    if (!params.workspacesId) {
      return new NextResponse("Not Found", { status: 400 });
    }

    const projectMembers = await db.member.findMany({
      where: {
        workspaceId: params.workspacesId,
      },
      include: {
        user: true,
      },
    });

    console.log("project Members: ", projectMembers);

    const fullInfo = projectMembers.map((member, index) => {
      return {
        memberId: member.id,
        memberUsername: member.user.name,
        memberAvatar: member.user.image,
      };
    });

    return NextResponse.json(fullInfo);
  } catch (error) {
    console.log("[WORKSPACE_MEMBERS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
