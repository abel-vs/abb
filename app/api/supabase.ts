"use client";
import { createClient } from "@/supabase/client";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

// Method to retrieve snippets by query
export const getSnippetsByQuery = async (
  query: string,
  match_count: number
): Promise<any> => {
  const supabase = createClient();
  console.log("Get snippets by query:", query);

  let query_embedding = null;
  try {
    const embeddings = new OpenAIEmbeddings();
    console.log("Embedding query:", query);
    query_embedding = await embeddings.embedQuery(query);
  } catch (e) {
    console.log(e);
  }

  console.log("Matching snippets...");

  const { data, error } = await supabase.rpc("match_file_snippets", {
    query_embedding: query_embedding,
    match_threshold: 0.78,
    match_count: match_count,
  });

  console.log("Data:", data);
  return { data, error };
};
