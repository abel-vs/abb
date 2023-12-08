import { FunctionCallPayload, Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";
import { MemoizedReactMarkdown } from "@/components/shared/markdown";
import { ChatMessageActions } from "@/components/chat/chat-message-actions";
import { SparklesIcon, UserIcon } from "@heroicons/react/24/outline";
import Spacer from "../shared/spacer";
import renderFunctionCall from "./function-messages";
import { extractObjects } from "@/lib/logic/extract-function-stream-objects";

function extractFunctionCall(
  message: Message,
): FunctionCallPayload | undefined {
  let functionCall = message.function_call;

  // Return if there is no function call
  if (!functionCall) {
    return;
  }

  if (typeof functionCall === "object") {
    // If the functionCall is an object, the function call is already complete
    if (!functionCall.name || !functionCall.arguments) {
      return undefined;
    }
    return {
      name: functionCall.name,
      arguments: JSON.parse(functionCall.arguments),
    };
  } else if (typeof functionCall === "string") {
    // If the functionCall is a string, it is still being generated
    try {
      const exercises = extractObjects("exercises", functionCall);
      if (exercises) {
        return {
          name: "create_exercises",
          arguments: { exercises: exercises },
        };
      }
    } catch (error) {
      // Do nothing
    }
  } else {
    throw new Error("Unkown function call type");
  }
}

export interface ChatMessageProps {
  message: Message;
  append: (message: Message) => void;
}

export function ChatMessage({ message, append, ...props }: ChatMessageProps) {
  const function_call = extractFunctionCall(message);
  return (
    <div
      className={cn(
        "group relative mb-4 flex flex-col items-start md:-ml-12 md:flex-row",
      )}
      {...props}
    >
      <div className="mb-3 flex w-full items-center gap-2 text-sm font-medium md:w-8">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border shadow",
            message.role === "user" ? "bg-background" : "bg-black",
          )}
        >
          {message.role === "user" ? (
            <UserIcon className="h-4 w-4" />
          ) : (
            <SparklesIcon className="h-4 w-4 text-white" />
          )}
        </div>
        <p className="md:hidden">
          {message.role === "user" ? "You" : "StudyBuddy"}
        </p>
        <Spacer />
        <ChatMessageActions message={message} />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <div className="flex flex-col">
          {/* {function_call && JSON.stringify(function_call)} */}
          {!function_call && (
            <MemoizedReactMarkdown
              className="prose break-words prose-p:leading-relaxed prose-pre:p-0"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>;
                },
              }}
            >
              {message.content}
            </MemoizedReactMarkdown>
          )}
          {(function_call &&
            typeof function_call === "object" &&
            renderFunctionCall(function_call, append, message.id)) ||
            null}
        </div>
      </div>
    </div>
  );
}
