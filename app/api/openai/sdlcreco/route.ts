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
            "You are an assistant that helps the user find the best software development life cycle for their project using the data they have prompted. You will base on these criteria: Project Scope and Complexity, Timeline, Team size, Client involvement, Scope and Requirements stability, Quality assurance and testing, Resource availability, Maintenance and Post-Deployment Support, Risk and Uncertainty. provide an insight for each category in order, do not categorize each criteria. Your only choices for the SDLC's are: Devops, Iterative, Kanban, Lean, Rad, Scrum, Spiral, V-Shape, and Waterfall. Your output should start with chosen sdlc. Additionally Add Confidence percentages per sdlc no need for explanations, output it last and order it from highest to lowest percentage, no need to add the title Confidence percentages and separate each with =====. Do not output a conclusion.  For each sentence separate it with =====.",
        },
        {
          role: "user",
          content: `Project Description: ${description} Start of development: ${today} Due Date of project: ${dueDate} Members: ${members}  Client Involvement: ${clientInvolvement} Scope and Requirements stability: ${scope} Quality Assurance and Testing: ${testing} Resource Availability: ${reqs} Maintenance and Post-Deployment Support: ${maintenance} Risk and Uncertainty: ${risk} Development Tools: ${devtools} `,
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

    if (!updateSdlc) {
      return new NextResponse("No Completion Detected!", { status: 400 });
    }

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
