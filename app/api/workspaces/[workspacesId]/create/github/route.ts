
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import axios from "axios";

export async function POST(
  req: Request,
  { params }: { params: { workspacesId: string } }
) {
  try {
    const user = await currentUser();

    const {
      owner,
      repo
    } = await req.json();

    if (!user) {
      return new NextResponse("User is required", { status: 400 });
    }

    const repoDetails = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);

    if (!repoDetails.data) {
        return new NextResponse("No Repository Detected!", { status: 400 });
    }
    
    const github = await db.workspace.update({
        where: {
            id: params.workspacesId,
            userId: user.id
        },
        data: {
            repo: repo,
            owner: owner
        }
    })

    return NextResponse.json(repoDetails.data);
  } catch (error) {
    console.log("[WORKSPACE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
