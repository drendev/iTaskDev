import axios from 'axios';
import { NextResponse } from 'next/server';

const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "<openai key>";
const azureEndpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "<openai endpoint>";
const apiVersion = "2024-02-01";
const deploymentName = process.env["AZURE_OPENAI_MODEL"] || "<openai model>";

export async function POST(req: Request): Promise<Response> {

    const data = await req.formData();
    const q1 = data.get('first') as string;
    let result = "";
    const prompt = "select a software development life cycle for the following user request\n\nThe only choices for software development life cycle recommendation that you will recommend are Waterfall, Scrum, Kanban, Spiral, V-Shape, Lean, DevOps, Iterative, RAD.\n\nOnly output the chosen software development life cycle name and confidence percentage. Do not form a sentence.\n\n" + q1;

    console.log(prompt)
    try {
        const response = await axios.post(
          `${azureEndpoint}openai/deployments/${deploymentName}/completions?api-version=${apiVersion}`,
          {
            prompt: prompt,
            temperature: 0,
            max_tokens: 100,
            top_p: 0.5,
            frequency_penalty: 0,
            presence_penalty: 0,
            best_of: 1,
            stop: null
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'api-key': apiKey
            }
          }
        );
        
        result = response.data.choices[0].text
        return NextResponse.json(result);
        
      } catch (error) {
        return NextResponse.json(error);
      }

    
      
}
