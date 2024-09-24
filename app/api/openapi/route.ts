import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();
export async function POST(req: Request): Promise<Response> {
  const data = await req.json();
  const prompt = data.description;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that helps the user find the best software development life cycle for their project using the data they have prompted. You will base on these criteria: Timeline, Team size, Complex features, Client involvement, Scope and Requirements stability, resource availability, quality assurance and testing and deployment, provide an insight for each category in order, if there are no inputs related to a category output 'No insights due to lack of data', do not categorize each criteria. Your only choices for the SDLC's are: Devops, Iterative, Kanban, Lean, Rad, Scrum, Spiral, V-Shape, and Waterfall. Your output should start with chosen sdlc (no need to add 'SDLC' after the sdlc name) and the confidence percentage (no need to add 'Confidence Percentage: ' in the beginning) is provided do not categorize these two and just answer what they are both should have ===== between and after . Additionaly, for each sentence separate it with =====",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log(completion.choices[0].message);

  return NextResponse.json(completion.choices[0].message);
}
