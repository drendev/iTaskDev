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

    const response = await req.json();

    const status = response.status;

    let dateCompleted: Date | null = new Date();

    if (status.status === "Pending") {
      dateCompleted = null;
    }

    const setStatus = await db.task.update({
      where: {
        id: status.id,
      },
      data: {
        Status: status.status,
        DateCompleted: dateCompleted,
      },
    });

    return NextResponse.json(setStatus);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
