import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const fetchFileSnippet = async (id: string) => {
  const { data: snippet, error } = await supabase
    .from("file_snippets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return snippet;
};

export const fetchFileSnippets = async (ids: string[]) => {
  const { data: snippets, error } = await supabase
    .from("file_snippets")
    .select("*")
    .in("id", ids);

  if (error) {
    throw error;
  }

  return snippets;
};

export const fetchFile = async (id: string) => {
  const { data: file, error } = await supabase
    .from("files")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return file;
};
