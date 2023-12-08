import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { NextRequest } from "next/server";
import { authorizeUser } from "@/utils/supabase/authorize-user";
import { functions } from "./functions";

export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const model = process.env.OPENAI_MODEL;

const system_prompt =
  "You are ABB-9000. An AI crewmate for ABB marine engineers.";

export async function POST(req: NextRequest) {
  const json = await req.json();
  const { messages } = json;

  const { user, response } = await authorizeUser();
  if (!user) {
    return response;
  }

  const res = await openai.createChatCompletion({
    model: model as string,
    messages: [
      {
        role: "system",
        content: system_prompt,
      },
      ...messages,
    ],
    temperature: 0.7,
    stream: true,
    functions,
  });

  const stream = OpenAIStream(res);
  return new StreamingTextResponse(stream);
}
