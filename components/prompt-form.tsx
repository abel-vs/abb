import * as React from "react";
import Textarea from "react-textarea-autosize";
import { UseChatHelpers } from "ai/react";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconArrowElbow, IconPlus } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";
import { useRecordVoice } from "../lib/hooks/useRecordVoice";
import LoadingCircle from "./loading-circle";

export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  onSubmit: (value: string) => void;
  isLoading: boolean;
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { startRecording, stopRecording, text: recording } = useRecordVoice();
  const router = useRouter();
  const [isRecording, setIsRecording] = React.useState(false);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    if (recording) {
      onSubmit(recording);
    }
  }, [recording]);

  React.useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  const onMouseDown = () => {
    setIsRecording(!isRecording);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!input?.trim()) {
          return;
        }
        setInput("");
        await onSubmit(input);
      }}
      ref={formRef}
    >
      <div className="relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.refresh();
                router.push("/");
              }}
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4"
              )}
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4 flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || input === ""}
              >
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={isRecording ? "default" : "icon"}
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
                className={`stroke-1  transition-all duration-1000 ease-in-out`}
              >
                {isRecording ? (
                  <div className="flex items-center gap-2">
                    <LoadingCircle />
                    <p>Recording...</p>
                  </div>
                ) : (
                  <Mic size={25} className="stroke-1" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Record input</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
}
