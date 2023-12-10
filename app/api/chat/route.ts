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
const image_model = "gpt-4-vision-preview";

const system_prompt =
  "You are ABB-9000. An AI crewmate for ABB marine engineers.\
  \n\nYou are tasked with helping the engineers with their daily tasks.\
  Use the function calls to retrieve information, base your answer on the documentation. \
  Include a picture when available and relevant.\
  When you can't answer a request, for example 'because I'm an AI model', just say, literally: 'I'm sorry Dave, I'm afraid I can't do that' Nothing else.";

export async function POST(req: NextRequest) {
  const json = await req.json();
  const { messages, data } = json;

  const initialMessages = messages.slice(0, -1);
  const currentMessage = messages[messages.length - 1];

  const { user, response } = await authorizeUser();
  if (!user) {
    return response;
  }

  console.log("MESSAGES:", messages);

  const hasImage = data && data.imageUrl !== undefined && data.imageUrl !== "";

  console.log("Has image:", hasImage);
  console.log("URL:", data?.imageUrl);

  const initialResponse = await openai.createChatCompletion({
    model: hasImage ? image_model : (model as string),
    messages: [
      {
        role: "system",
        content: system_prompt,
      },
      ...initialMessages,
      {
        ...currentMessage,
        content: hasImage
          ? [
              { type: "text", text: currentMessage.content },
              ...(hasImage
                ? [{ type: "image_url", image_url: data?.imageUrl }]
                : []),
            ]
          : currentMessage.content,
      },
    ],
    temperature: 0.7,
    stream: true,
    ...(hasImage ? {} : { functions }),
  });

  const stream = OpenAIStream(
    initialResponse
    //   \{
    //   experimental_onFunctionCall: async (
    //     { name, arguments: args },
    //     createFunctionCallMessages
    //   ) => {
    //     const result = await runFunction(name, args);
    //     console.log("Function result:", result);
    //     const newMessages = createFunctionCallMessages(result);
    //     console.log("New messages:", newMessages);
    //     return openai.createChatCompletion({
    //       model: model as string,
    //       stream: true,
    //       messages: [...messages, ...newMessages],
    //       functions,
    //     });
    //   },
    // }
  );

  return new StreamingTextResponse(stream);
}
