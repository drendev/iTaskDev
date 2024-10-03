import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {
  const today = new Date();
  try {
    const {
      description,
      dueDate,
      members,
      clientInvolvement,
      scope,
      testing,
      reqs,
      maintenance,
      risk,
      devtools,
      projectId,
    } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that identifies the difficulty of the task(s) if it is easy, moderate, hard that will be provided by the user",
        },
        {
          role: "user",
          content: ``,
        },
      ],
    });

    const data = completion.choices[0].message.content;

    if (!data) {
      return new NextResponse("No Completion Detected!", { status: 400 });
    }

    const sectionsArray = data.split(/\s*=====+\s*/);
    const filteredArray: string[] = sectionsArray.filter(
      (section: string) => section.trim() !== ""
    );

    if (filteredArray[0] === "Unrelated") {
      return new NextResponse("Unrelated", { status: 400 });
    }

    const updateSdlc = await db.workspace.update({
      where: {
        id: projectId,
      },
      data: {
        sdlc: filteredArray[0].toLowerCase(),
        sdlcAi: {
          create: [
            {
              scopeComplex: filteredArray[1],
              timeline: filteredArray[2],
              teamSize: filteredArray[3],
              clientInvolvement: filteredArray[4],
              scopeAndRequirements: filteredArray[5],
              qualityAssurance: filteredArray[6],
              resourceAvailability: filteredArray[7],
              maintenance: filteredArray[8],
              risk: filteredArray[9],
              percentages: [
                filteredArray[10],
                filteredArray[11],
                filteredArray[12],
                filteredArray[13],
                filteredArray[14],
                filteredArray[15],
                filteredArray[16],
                filteredArray[17],
                filteredArray[18],
              ],
            },
          ],
        },
      },
    });

    console.log(filteredArray);

    if (!updateSdlc) {
      return new NextResponse("No Completion Detected!", { status: 400 });
    }

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
