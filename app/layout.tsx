import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Header } from "@/components/header";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import SupabaseAuthProvider from "@/lib/providers/supabase-auth-provider";
import SupabaseProvider from "@/lib/providers/supabase-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "HAL 8000",
  description: "AI Crew Mate",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient(cookies());

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <SupabaseProvider>
          <SupabaseAuthProvider serverSession={session}>
            <Toaster />
            <Providers
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main className="h-screen flex flex-col items-center">
                <Header />
                {children}
              </main>
              <TailwindIndicator />
            </Providers>
          </SupabaseAuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
