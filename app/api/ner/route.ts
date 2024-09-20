import { NextResponse } from "next/server";
import {
  AnalyzeBatchAction,
  AzureKeyCredential,
  TextAnalysisClient,
} from "@azure/ai-language-text";

// You will need to set these environment variables or edit the following values
const endpoint = process.env["LANGUAGE_ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["LANGUAGE_KEY"] || "<api key>";
const deploymentName = process.env["CUSTOM_ENTITIES_DEPLOYMENT_NAME"] || "deployment name";
const projectName = process.env["CUSTOM_ENTITIES_PROJECT_NAME"] || "deployment name";

export async function POST(req: Request): Promise<Response> {
  const data = await req.formData();
  const q1 = data.get('first') as string;
  const q2 = data.get('second') as string;

  const documents: string[] = [q1, q2];

  console.log("== Custom Entity Recognition Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  const actions: AnalyzeBatchAction[] = [
    {
      kind: "CustomEntityRecognition",
      deploymentName,
      projectName,
    },
  ];
  
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const results = await poller.pollUntilDone();

  const recognizedEntities: { documentId: string; entities: { text: string; category: string }[] }[] = [];

  for await (const actionResult of results) {
    if (actionResult.kind !== "CustomEntityRecognition") {
      throw new Error(`Expected a CustomEntityRecognition result but got: ${actionResult.kind}`);
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    for (const result of actionResult.results) {
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }

      const entities = result.entities.map(entity => ({
        text: entity.text,
        category: entity.category,
      }));

      recognizedEntities.push({
        documentId: result.id,
        entities,
      });
    }
  }

  return NextResponse.json({ recognizedEntities });
}