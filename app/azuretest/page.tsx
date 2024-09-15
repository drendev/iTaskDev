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
  
  const documents = [
    "This Loan Agreement ('Agreement') is entered into as of September 15, 2024, by and between The Lender agrees to loan the Borrower the principal sum of $10,000 USD (the “Loan”), which will be disbursed on September 20, 2024."
  ];
  
 async function main() {
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
  
    for await (const actionResult of results) {
      if (actionResult.kind !== "CustomEntityRecognition") {
        throw new Error(`Expected a CustomEntityRecognition results but got: ${actionResult.kind}`);
      }
      if (actionResult.error) {
        const { code, message } = actionResult.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      for (const result of actionResult.results) {
        console.log(`- Document ${result.id}`);
        if (result.error) {
          const { code, message } = result.error;
          throw new Error(`Unexpected error (${code}): ${message}`);
        }
        console.log("\tRecognized Entities:");
        for (const entity of result.entities) {
          console.log(`\t- Entity "${entity.text}" of type ${entity.category}`);
        }
      }
    }
  }
  
  

const AzureTest = () => {

main().catch((err) => {
    console.error("The sample encountered an error:", err);
    });


  return <div>TEst</div>;
};

export default AzureTest;
