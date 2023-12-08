import { cookies } from "next/headers";
import { User } from "@supabase/supabase-js";
import { createClient } from "./server";

// Method to authorize user on server
export async function authorizeUser(): Promise<{
  response?: Response;
  user?: User;
}> {
  const supabase = createClient(cookies());
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return {
      response: new Response(`Authorization failed: ${error.message}`, {
        status: 401,
        statusText: "Unauthorized",
      }),
    };
  }

  if (!user) {
    return {
      response: new Response("User not found", {
        status: 404,
        statusText: "Not Found",
      }),
    };
  }

  return { user };
}
