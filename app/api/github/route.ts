import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const { owner, repo } = await req.json();

        if (!owner || !repo) {
            return new NextResponse("No Completion Detected!", { status: 400 });
        }

        const repoDetails = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);

        const recentCommits = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`);

        return NextResponse.json({
            repository: repoDetails.data,
            commits: recentCommits.data
        })

    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}