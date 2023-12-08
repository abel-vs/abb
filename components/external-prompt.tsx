"use client";
import { useChat } from "ai/react";
import { PromptForm } from "./prompt-form";
import { useRouter } from "next/navigation";

export const ExternalPrompt = () => {
  const router = useRouter();
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({});
  return (
    <div className="w-full">
      <PromptForm
        onSubmit={async (value) => {
          router.push(`/chat`);
        }}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
      />
    </div>
  );
};
