import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { Task } from "@prisma/client";

import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(
  req: Request,
  { params }: { params: { workspacesId: string } }
) {
  try {
    const user = await currentUser();

    const content = await req.json();

    if (!user) {
      return new NextResponse("User is required", { status: 400 });
    }

    const today = new Date();

    const CreatedTasks: Task[] = [];

    const tasks = await Promise.all(
      content.tasks.map(async (taskData: any) => {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          temperature: 0,
          messages: [
            {
              role: "system",
              content:
                "You are an assistant that identifies the difficulty of the task(s) if it is easy, medium, hard that will be provided by the user. Do not explain any further just state if it is easy, medium or hard. output 'Unrelated' if it can't be determined ",
            },
            {
              role: "user",
              content: `Task Content: ${taskData.content} Task Start Date: ${today} Task Deadline: ${taskData.dueDate}`,
            },
          ],
        });

        let intensity = completion.choices[0].message.content;

        if (intensity === "Unrelated") {
          intensity = null;
        }

        const createdTask = await db.task.create({
          data: {
            content: taskData.content,
            DateDue: taskData.dueDate,
            Intensity: intensity,
            projectId: params.workspacesId,
          },
        });

        CreatedTasks.push(createdTask);
      })
    );

    console.log(CreatedTasks);

    return NextResponse.json(CreatedTasks);
  } catch (error) {
    console.log("[CREATE TASK ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
