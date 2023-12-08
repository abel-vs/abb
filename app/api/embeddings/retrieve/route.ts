import { createClient } from "@/supabase/server";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { query, match_count } = await req.json();

  const supabase = createClient(cookies());
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

  if (error) return NextResponse.json(error);

  console.log("Data:", data);
  return NextResponse.json(data);
};
