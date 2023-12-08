"use client";

import { Session, User } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { useSupabase } from "./supabase-provider";

interface AuthContextProps {
  user: User | null | undefined;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<string | null>;
  signUpWithEmail: (email: string, password: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signOut: async () => {},
  signInWithGoogle: async () => {},
  signInWithEmail: async (email: string, password: string) => null,
  signUpWithEmail: async (email: string, password: string) => null,
});

export default function SupabaseAuthProvider({
  serverSession,
  children,
}: {
  serverSession?: Session | null;
  children: React.ReactNode;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();

  const user = serverSession?.user ?? null;

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
    // router.push("/login");
    // router.refresh();
  };

  // Sign-In with Github
  const signInWithGoogle = async () => {
    console.log("sign in with google");
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "/auth/callback" },
    });
  };

  // Sign-In with Email
  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message;
    }

    return null;
  };

  // Sign-Up with Email
  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "/auth/callback",
      },
    });

    if (error) {
      return error.message;
    }

    return null;
  };

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        console.log("Refresh");
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, serverSession?.access_token]);

  const exposed: AuthContextProps = {
    user,
    signOut,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
  };

  return (
    <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  let context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside SupabaseAuthProvider");
  } else {
    return context;
  }
};
