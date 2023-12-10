import * as React from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { IconGitHub } from "@/components/ui/icons";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import AuthButton from "./AuthButton";

// async function UserOrLogin() {
//   const supabase = createClient(cookies());
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   return (
//     <>
//       {session?.user ? (
//         <>
//           <SidebarMobile>
//             <ChatHistory userId={session.user.id} />
//           </SidebarMobile>
//           <SidebarToggle />
//         </>
//       ) : (
//         <Link href="/" target="_blank" rel="nofollow">
//           <IconNextChat className="w-6 h-6 mr-2 dark:hidden" inverted />
//           <IconNextChat className="hidden w-6 h-6 mr-2 dark:block" />
//         </Link>
//       )}
//       <div className="flex items-center">
//         <IconSeparator className="w-6 h-6 text-muted-foreground/50" />
//         {session?.user ? (
//           <UserMenu user={session.user} />
//         ) : (
//           <Button variant="link" asChild className="-ml-2">
//             <Link href="/sign-in?callbackUrl=/">Login</Link>
//           </Button>
//         )}
//       </div>
//     </>
//   );
// }

export function Header() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <a className="flex items-center gap-2" href="/">
        <Image src="/hal.gif" alt="Big Image" width="40" height="40" />
        <p className="font-bold">ABB 9000</p>
      </a>
      {/* <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div> */}
      <div className="flex items-center justify-end space-x-2">
        {isSupabaseConnected && <AuthButton />}
        <a
          target="_blank"
          href="https://github.com/abel-vs/abb/"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <IconGitHub />
          <span className="hidden ml-2 md:flex">GitHub</span>
        </a>
      </div>
    </header>
  );
}
