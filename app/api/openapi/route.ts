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
            deployment, 
            clientInvolvement, 
            complexFeatures, 
            tasks, 
            testing,
            projectId,
            scope
        } = await req.json();

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0,
            messages: [
                {
                role: "system",
                content:
                    "You are an assistant that helps the user find the best software development life cycle for their project using the data they have prompted. You will base on these criteria: Timeline, Team size, Complex features, Client involvement, Scope and Requirements stability, resource availability, quality assurance and testing and deployment, provide an insight for each category in order, do not categorize each criteria. Your only choices for the SDLC's are: Devops, Iterative, Kanban, Lean, Rad, Scrum, Spiral, V-Shape, and Waterfall. Your output should start with chosen sdlc (no need to add 'SDLC' after the sdlc name) and the confidence percentage (no need to add 'Confidence Percentage: ' in the beginning) is provided do not categorize these two and just answer what they are both should have ===== between and after . Additionaly, for each sentence separate it with =====. Lastly, if the user prompt is unrelated to software development life cycle output 'Unrelated'",
                },
                {
                role: "user",
                content: `Description: ${description} Start of development: ${today} Due Date of project: ${dueDate} Members: ${members} Deployment: ${deployment} Client Involvement: ${clientInvolvement} Complex Features: ${complexFeatures} Tasks: ${tasks} Testing: ${testing} Scope and Requirements stability: ${scope}`,
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
                  timeline: filteredArray[2],
                  teamSize: filteredArray[3],
                  complexFeatures: filteredArray[4],
                  clientInvolvement: filteredArray[5],
                  scopeAndRequirements: filteredArray[6],
                  resourceAvailability: filteredArray[7],
                  qualityAssurance: filteredArray[8],
                  deployment: filteredArray[9],
                }
              ]
            }
          }
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
