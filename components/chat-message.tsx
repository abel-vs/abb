// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/codeblock";
import { MemoizedReactMarkdown } from "@/components/markdown";
import {
  IconDownload,
  IconOpenAI,
  IconSpinner,
  IconUser,
} from "@/components/ui/icons";
import { ChatMessageActions } from "@/components/chat-message-actions";
import renderFunctionCall from "./chat/function-messages";
import {
  extractFunctionCall,
  parseFunctionRoleMessage,
} from "@/app/api/extraction";
import { CustomMarkdown } from "./custom-markdown";

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  if (message.role === "function") {
    const function_call = parseFunctionRoleMessage(message);
    return renderFunctionCall(function_call); // Don't render function calls
  }
  if (message.role === "assistant" && message.function_call) {
    const function_call = extractFunctionCall(message);
    if (!function_call) {
      return null;
    }
    return renderFunctionCall(function_call);
  }
  if (message.role === "assistant" && message.content === "") {
    return null;
  }
  return (
    <div
      className={cn("group relative mb-4 flex items-start md:-ml-12")}
      {...props}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-background"
        )}
      >
        {message.role === "user" ? (
          <IconUser />
        ) : message.role === "assistant" ? (
          // <IconOpenAI />
          <Image src="/hal.gif" alt="ABB" width="25" height="25" />
        ) : (
          <IconDownload />
        )}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <CustomMarkdown content={message.content} {...props} />
        <ChatMessageActions message={message} />
      </div>
    </div>
  );
}
