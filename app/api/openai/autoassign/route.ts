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
        user: true,
        tasks: {
          include: {
            task: true,
            member: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    // const taskPerMember = getTasks.map((member) => {
    //   return {
    //     memberId: member.id,
    //     memberName: member.user.name,
    //     tasks: member.tasks.map(
    //       (taskEntry) => taskEntry.task.content + taskEntry.task.Intensity
    //     ),

    //     tasksMember: member.tasks.map(
    //       (taskMembers) => taskMembers.member.user.name
    //     ),
    //   };
    // });

    const tasksString = CreatedTask.map(
      (task: Task, index: number) =>
        `Task ${index}: ${task.content} | Task ${index} Intensity: ${task.Intensity}`
    ).join("\n");

    const membersWithTasksString = getTasks.map(
      (member) =>
        `Member Id: ${member.id}
         ${member.tasks.map(
           (taskEntry, index) =>
             `Task ${index + 1}: ` +
             taskEntry.task.content +
             " " +
             `Task ${index + 1} Intensity
             ${taskEntry.task.Intensity}`
         )}  
      `
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that assigns tasks that will be given by the user that also has its task intensity rating and its deadline. Output the most fitting members that you will assign on the tasks prompted depending on each member's workload. You can assign more than one member in a task if necessary. Just output the members that will be assigned no need for explanations.",
        },
        {
          role: "user",
          content: `
              Newly Created Tasks:
              ${tasksString}

              Members with Tasks:
              ${membersWithTasksString}

            `,
        },
      ],
    });

    const data = completion.choices[0].message.content;

    // Regular expression to match UUIDs

    if (!data) {
      return new NextResponse("No Completion Detected!", { status: 400 });
    }

    const assignedMembers = data.trim().split("\n");

    // Regular expression to match UUIDs
    const uuidRegex =
      /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g;

    // Map over each task, extract UUIDs and store in a 2D array
    const memberUUIDs = assignedMembers.map(
      (member) => member.match(uuidRegex) || []
    );

    const CreatedTasksAssigned = CreatedTask.map((task: any, index: number) => {
      return {
        task: task.id,
        members: memberUUIDs[index],
      };
    });

    console.log("CreatedTaskassigned: ", CreatedTasksAssigned);

    const assignTasks = await Promise.all(
      CreatedTasksAssigned.map(async (task: any) => {
        return db.task.update({
          where: {
            id: task.task,
            projectId: CreatedTask[0].projectId,
          },
          data: {
            members: {
              createMany: {
                data: task.members.map((memberId: string) => ({
                  memberId,
                })),
              },
            },
          },
        });
      })
    );

    return NextResponse.json(CreatedTasksAssigned);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
