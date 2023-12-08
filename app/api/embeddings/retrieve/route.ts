import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { cookies } from "next/headers";
import { createClient } from "utils/supabase/server";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const client = createClient(cookies());

  const vectorStore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
    client,
    tableName: "file_snippets",
    queryName: "match_file_snippets",
  });

  const resultOne = await vectorStore.similaritySearch(query, 1);

  console.log(resultOne);

  return new Response(JSON.stringify(resultOne), {
    status: 200,
  });
}
