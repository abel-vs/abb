"use client";

import { Mic } from "lucide-react";
import { useRecordVoice } from "../lib/hooks/useRecordVoice";

const Microphone = () => {
  const { startRecording, stopRecording, text } = useRecordVoice();

  const onMouseDown = () => {
    startRecording();
  };

  const onMouseUp = () => {
    stopRecording();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        className="border-none bg-transparent w-10"
      >
        <Mic size={40} className="stroke-red-500 active:stroke-violet-700" />
      </button>
      <p>{text}</p>
    </div>
  );
};

export { Microphone };
