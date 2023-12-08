// import { nanoid } from "@/lib/utils";
import { Chat } from "@/components/chat";
import { nanoid } from "ai";

export default function IndexPage() {
  const id = nanoid();

  return <Chat id={id} className="relative w-full h-screen" />;
}
