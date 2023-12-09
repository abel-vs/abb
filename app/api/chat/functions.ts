import { ChatRequest, FunctionCallHandler, nanoid } from "ai";
import { ChatCompletionFunctions } from "openai-edge";

export const functionCallHandler: FunctionCallHandler = async (
  chatMessages,
  functionCall
) => {
  console.log("Handling Function Call:", functionCall);
  let data = [];
  const name = functionCall.name || "";
  const args = functionCall.arguments ? JSON.parse(functionCall.arguments) : {};
  data = await runFunction(name, args);
  console.log("Function call handled: ", data);
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
  // console.log("Returning data:", data);
  // return data[0].content;
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
    case "retrieve_information":
      if (args) {
        const { query } = args;
        const snippets = await get_snipppets(query);
        return snippets;
      } else {
        console.error("functionCall.arguments is undefined");
      }
      break;
    case "show_references":
      if (args) {
        const { reference_ids } = args;
        return reference_ids;
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
    name: "retrieve_information",
    description: "Retrieves information to help answer the query of the user.",
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
  {
    name: "show_references",
    description: "Shows the references for the given query.",
    parameters: {
      type: "object",
      properties: {
        reference_ids: {
          type: "array",
          items: {
            type: "string",
            description:
              "The ids of the file snippets used to created the previous answer",
          },
        },
      },
      required: ["references"],
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
