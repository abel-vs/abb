import Image from "next/image";
import { ExternalPrompt } from "@/components/external-prompt";
import { Button } from "@/components/ui/button";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6 items-center h-full justify-center">
          <Image src="/hal.gif" alt="Big Image" width="200" height="200" />
          <h2 className="font-bold text-4xl my-8">Welcome to the ABB-9000</h2>
          <Button className="w-full">Start</Button>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by <a>The Silicon Seals</a>
        </p>
      </footer>
    </div>
  );
}
