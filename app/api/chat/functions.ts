import { FunctionCallHandler } from "ai";
import { ChatCompletionFunctions } from "openai-edge";

export const functionCallHandler: FunctionCallHandler = async (
  chatMessages,
  functionCall
) => {
  console.log("Handling Function Call:", functionCall);
  switch (functionCall.name) {
    case "find_relevant_snippets":
      if (functionCall.arguments) {
        const args = JSON.parse(functionCall.arguments);
        const response = await fetch("/api/embeddings/retrieve", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: args.query,
            match_count: 3,
          }),
        });
        const data = await response.json();
        console.log("Snippets:", data);
        return data;
      } else {
        console.error("functionCall.arguments is undefined");
      }
      break;
    default:
      console.error(`Unknown function call: ${functionCall.name}`);
  }
  console.log("Function call handled.");
};

export const functions: ChatCompletionFunctions[] = [
  {
    name: "find_relevant_snippets",
    description:
      "Finds the relevant pdf snippets for the given query. Used for finding info out of PDFs.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Description of what you want to find.",
        },
      },
      required: ["query"],
    },
  },
  // {
  //   name: "find_relevant_images",
  //   description:
  //     "Finds the relevant pdf snippets for the given query. Used for finding info out of PDFs.",
  //   parameters: {
  //     type: "object",
  //     properties: {
  //       query: {
  //         type: "string",
  //         description: "Description of what you want to find.",
  //       },
  //     },
  //     required: ["query"],
  //   },
  // },
];
