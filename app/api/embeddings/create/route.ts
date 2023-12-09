import { authorizeUser } from "@/utils/supabase/authorize-user";
import { createClient } from "@/utils/supabase/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  const { file_name, file_id, file_type } = await req.json();
  if (!file_name) throw new Error("No file name provided");
  if (!file_id) throw new Error("No file id provided");

  const { user, response } = await authorizeUser();
  if (!user) return response;

  const supabase = createClient(cookies());

  const { data: file, error } = await supabase.storage
    .from("custom_files")
    .download(`${user.id}/${file_name}`);

  if (error) throw error;
  if (!file) throw new Error("File does not exist");

  console.log(file);

  // Write the PDF to a temporary file. This is necessary because the PDFLoader
  const loader = new PDFLoader(file);

  const rawDocs = await loader.load();
  /* Split text into chunks */
  //   const textSplitter = new RecursiveCharacterTextSplitter({
  //     chunkSize: 5000,
  //     chunkOverlap: 500,
  //   });
  const textSplitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: 500,
    chunkOverlap: 0,
  });

  const docs = await textSplitter.splitDocuments(rawDocs);
  const doc_texts = docs.map((doc) => doc.pageContent);

  const embeddings = new OpenAIEmbeddings();
  const doc_embeddings = await embeddings.embedDocuments(doc_texts);

  const file_snippets = docs.map((doc, i) => {
    const id = uuid();
    console.log(doc.metadata);
    return {
      id: id,
      file_id: file_id,
      file_type: file.type,
      content: doc.pageContent,
      embedding: doc_embeddings[i],
      metadata: { location: doc.metadata.loc },
    };
  });

  await supabase.from("file_snippets").insert(file_snippets);

  return NextResponse.json({ message: "Success" });
}
