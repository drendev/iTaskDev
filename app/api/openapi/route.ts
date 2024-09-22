import axios from 'axios';
import { NextResponse } from 'next/server';

const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "<openai key>";
const azureEndpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "<openai endpoint>";
const apiVersion = "2024-02-01";
const deploymentName = process.env["AZURE_OPENAI_MODEL"] || "<openai model>";

export async function POST(req: Request): Promise<Response> {

    const data = await req.json();
    const q1 = data.description;
    let result = "";
    const prompt = "select a software development life cycle for the following user request\n\nThe only choices for software development life cycle recommendation that you will recommend are Waterfall, Scrum, Kanban, Spiral, V-Shape, Lean, DevOps, Iterative, RAD.\n\nOnly output the chosen software development life cycle name and confidence percentage. Do not form a sentence. Say No input found if I haven't input anything. Say Information is Unapplicable if my input is irrelevant\n\n" + q1;

    console.log(prompt)
    try {
        // const response = await axios.post(
        //   `${azureEndpoint}openai/deployments/${deploymentName}/completions?api-version=${apiVersion}`,
        //   {
        //     prompt: prompt,
        //     temperature: 0,
        //     max_tokens: 100,
        //     top_p: 0.5,
        //     frequency_penalty: 0,
        //     presence_penalty: 0,
        //     best_of: 1,
        //     stop: null
        //   },
        //   {
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'api-key': apiKey
        //     }
        //   }
        // );
        
        // result = response.data.choices[0].text

        return NextResponse.json("waterfall");
        
      } catch (error) {
        return NextResponse.json(error);
      }

    
      
}
