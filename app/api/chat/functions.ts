import { fetchFile, fetchFileSnippets } from "@/lib/actions/server-actions";
import { createClient } from "@/utils/supabase/server";
import { ChatRequest, FunctionCallHandler, nanoid } from "ai";
import { cookies } from "next/headers";
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
  if (!data) {
    console.log("No response from AI needed");
    return;
  }
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

export const get_references = async (reference_ids: string[]) => {
  console.log("Fetching file snippets for: ", reference_ids);
  let file_snippets = [];
  try {
    file_snippets = await fetchFileSnippets(reference_ids);
    console.log("File snippets:", file_snippets);
    for (let i = 0; i < file_snippets.length; i++) {
      console.log("Fetching file:", file_snippets[i].file_id);
      const file = await fetchFile(file_snippets[i].file_id);
      file_snippets[i].file = file;
    }
    console.log("File snippets:", file_snippets);
  } catch (e) {
    console.log(e);
  }
  return file_snippets;
};

export const runFunction = async (name: string, args: any): Promise<any> => {
  switch (name) {
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
        const references = await get_references(reference_ids);
        return references;
      } else {
        console.error("functionCall.arguments is undefined");
      }
      break;
    case "list_files":
      console.log("Running list_files");
      break;
    default:
      console.error(`Unknown function call: ${name}`);
  }
  console.log("Function call handled.");
};

export const functions: ChatCompletionFunctions[] = [
  {
    name: "retrieve_information",
    description: "Retrieves information to help answer the prompt of the user.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Description of what you want to find. Used to search related files.",
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
  {
    name: "list_files",
    description:
      "Gives the user the option to select a file from a list of all files.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
];
