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

    console.log("Response", response);

    const setStatus = await db.task.update({
      where: {
        id: status.id,
      },
      data: {
        Status: status.status,
      },
    });

    return NextResponse.json(setStatus);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
