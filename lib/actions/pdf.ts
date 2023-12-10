import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";

export const fetchFile = async (id: string) => {
  const supabase = createClient(cookies());
  const { data: file, error } = await supabase
    .from("files")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return file;
};

export const downloadFile = async (file_path: string) => {
  const supabase = createClient(cookies());
  const { data: file, error } = await supabase.storage
    .from("files")
    .download(`${file_path}`);

  if (error) throw error;
  if (!file) throw new Error("File does not exist");
  return file;
};
