import { UseChatHelpers } from "ai/react";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { IconArrowRight } from "@/components/ui/icons";

import Image from "next/image";

const exampleMessages = [
  {
    heading: "Give me the diagram for X",
    message: `Give me the diagram for X`,
  },
  {
    heading: "What kind of motor does Y use?",
    message: "What kind of motor does Y use?",
  },
  {
    heading: "Show me the location of Z?",
    message: `Show me the location of Z?`,
  },
];

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, "setInput">) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <a href="/">
          <Image
            src="/hal.gif"
            alt="Big Image"
            width="200"
            height="200"
            className="mx-auto mb-4"
          />
        </a>

        <h1 className="mb-2 text-lg font-semibold">Welcome to ABB-9000!</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is an AI crew mate developed by the Silicon Seals
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
