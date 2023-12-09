import { ChatRequest, FunctionCallHandler, nanoid } from "ai";
import { ChatCompletionFunctions } from "openai-edge";

export const functionCallHandler: FunctionCallHandler = async (
  chatMessages,
  functionCall
) => {
  console.log("Handling Function Call:", functionCall);
  let data = {};
  const name = functionCall.name;
  const args = functionCall.arguments ? JSON.parse(functionCall.arguments) : {};
  switch (name) {
    case "find_relevant_snippets":
      if (args) {
        const { query } = args;
        data = await get_snipppets(query);
      } else {
        console.error("No arguments provided for function call.");
      }
      break;
    default:
      console.error(`Unknown function call: ${name}`);
  }
  console.log("Function call handled.");
  console.log("Chat messages: ", chatMessages);
  const functionResponse: ChatRequest = {
    messages: [
      ...chatMessages,
      {
        id: nanoid(),
        name,
        role: "function" as const,
        content: JSON.stringify(data),
      },
      // {
      //   id: nanoid(),
      //   name,
      //   role: "function" as const,
      //   content: JSON.stringify(data),
      // },
    ],
  };
  return functionResponse;
};

export const get_snipppets = async (query: string) => {
  const response = await fetch("/api/embeddings/retrieve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      match_count: 3,
    }),
  });
  const data = await response.json();
  console.log("Snippets:", data);
  return data;
};

export const runFunction = async (name: string, args: any): Promise<any> => {
  switch (name) {
    case "find_relevant_snippets":
      if (args) {
        const { query } = args;
        const snippets = await get_snipppets(query);
        return snippets;
      } else {
        console.error("functionCall.arguments is undefined");
      }
      break;
    default:
      console.error(`Unknown function call: ${name}`);
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
