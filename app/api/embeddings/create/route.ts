import { authorizeUser } from "@/utils/supabase/authorize-user";
import { createClient } from "@/utils/supabase/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  const { file_name, file_id } = await req.json();
  if (!file_name) throw new Error("No file name provided");
  if (!file_id) throw new Error("No file id provided");

  const { user, response } = await authorizeUser();
  if (!user) return response;

  const supabase = createClient(cookies());

  const { data: file, error } = await supabase.storage
    .from("files")
    .download(`${file_name}`);

  if (error) throw error;
  if (!file) throw new Error("File does not exist");

  if (file.type === "text/markdown") {
    const rawDocs = await file.text();

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
      chunkSize: 500,
      chunkOverlap: 0,
    });
    const docs = await splitter.createDocuments([rawDocs]);

    console.log(docs);
    const doc_texts = docs.map((doc) => doc.pageContent);

    console.log("doc_texts", doc_texts);

    const embeddings = new OpenAIEmbeddings();
    const doc_embeddings = await embeddings.embedDocuments(doc_texts);

    let file_snippets: any[] = [];
    try {
      file_snippets = docs.map((doc, i) => {
        const id = uuid();
        return {
          id: id,
          file_id: file_id,
          content: doc.pageContent,
          embedding: doc_embeddings[i],
          metadata: { location: doc.metadata.loc },
        };
      });
    } catch (e) {
      console.log(e);
    }

    await supabase.from("file_snippets").insert(file_snippets);

    return NextResponse.json({ message: "Success" });
  } else if (file.type === "application/pdf") {
    // Write the PDF to a temporary file. This is necessary because the PDFLoader
    const loader = new PDFLoader(file);

    const rawDocs = await loader.load();
    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 5000,
      chunkOverlap: 500,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    const doc_texts = docs.map((doc) => doc.pageContent);

    console.log("doc_texts", doc_texts);

    const embeddings = new OpenAIEmbeddings();
    const doc_embeddings = await embeddings.embedDocuments(doc_texts);

    let file_snippets: any[] = [];
    try {
      file_snippets = docs.map((doc, i) => {
        const id = uuid();
        return {
          id: id,
          file_id: file_id,
          content: doc.pageContent,
          embedding: doc_embeddings[i],
          metadata: { location: doc.metadata.loc },
        };
      });
    } catch (e) {
      console.log(e);
    }

    await supabase.from("file_snippets").insert(file_snippets);

    return NextResponse.json({ message: "Success" });
  }
  return NextResponse.json({ message: "Unsupported file type" });
}
