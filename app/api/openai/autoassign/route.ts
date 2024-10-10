import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Task } from "@prisma/client";
import { Member } from "@prisma/client";

const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const CreatedTaskProto = await req.json();
    const CreatedTask = CreatedTaskProto.CreatedTask;

    const getTasks = await db.member.findMany({
      where: {
        workspaceId: CreatedTask[0].projectId,
      },
      include: {
        tasks: {
          include: {
            task: {
              include: {
                members: true,
              },
            },
          },
        },
        user: true,
      },
    });

    console.log("Get Tasks: ", getTasks);

    // const tasksString = CreatedTask.map(
    //   (task: Task, index: number) =>
    //     `Task ${index}: ${task.content} | Task ${index} Intensity: ${task.Intensity}`
    // ).join("\n");

    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4o",
    //   temperature: 0,
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         "You are an assistant that assigns tasks that will be given by the user that also has its task intensity rating and its deadline. Output the most fitting members that you will assign on the tasks prompted depending on each member's workload. Just output the members that will be assigned no need for explanations.",
    //     },
    //     {
    //       role: "user",
    //       content: `
    //           Newly Created Tasks:
    //           ${tasksString}

    //           Members with Tasks:

    //         `,
    //     },
    //   ],
    // });

    // const data = completion.choices[0].message.content;

    // if (!data) {
    //   return new NextResponse("No Completion Detected!", { status: 400 });
    // }

    // return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
