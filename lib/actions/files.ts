import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { sanitizeFileName } from "../utils";

const supabase = createClient();

// Helper function to insert a new file into the custom_files table
const insertFile = async (id: string, file: File, file_path: string) => {
  await supabase.from("files").insert([
    {
      id,
      name: file.name,
      type: file.type,
      file_path,
      created_at: new Date(),
    },
  ]);
};

export const uploadFiles = async (
  files: File[],
  user_id: string
): Promise<{ name: string; id: string }[]> => {
  // Initialize an array to store the ids of the custom files
  let custom_files: { name: string; id: string }[] = [];

  // Iterate over each file
  for (const file of files) {
    // Upload the file to the storage
    const sanitized_file_name = sanitizeFileName(file.name);
    console.log("Storing file: ", sanitized_file_name);
    const { data: storageData, error } = await supabase.storage
      .from("files")
      .upload(`${sanitized_file_name}`, file);

    // If there's an error during upload
    if (error) {
      // If the error is due to a duplicate file
      if ((error as any).error === "Duplicate") {
        console.log("File already exists");

        // Fetch the existing file data
        const { data: existingFileData, error: existingFileError } =
          await supabase
            .from("files")
            .select("id")
            .eq("name", sanitized_file_name);

        // If there's an error fetching the existing file data, throw the error
        if (existingFileError) throw existingFileError;

        // If the existing file data is not found, insert the new file into the custom_files table
        if (existingFileData?.length === 0) {
          const id = uuid();
          await insertFile(id, file, `${sanitized_file_name}`);
          custom_files.push({ name: sanitized_file_name, id });
        } else {
          // If the existing file data is found, use its id
          custom_files.push({
            name: sanitized_file_name,
            id: existingFileData[0].id,
          });
        }
      } else {
        // If the error is not due to a duplicate file, throw the error
        console.error(error);
        throw error;
      }
    } else {
      // If there's no error during upload
      console.error("File Error", error);
      if (!storageData) throw new Error("File upload failed");

      const id = uuid();
      console.log("Inserting file: ", sanitized_file_name);
      await insertFile(id, file, storageData.path);
      custom_files.push({ name: sanitized_file_name, id });
    }
  }

  // Return the ids of the custom files
  return custom_files;
};

export const embedFiles = async (files: { name: string; id: string }[]) => {
  for (let i = 0; i < files.length; i++) {
    const custom_file = files[i];
    const { data: snippets, error } = await supabase
      .from("file_snippets")
      .select("file_id")
      .eq("file_id", custom_file.id)
      .limit(1);

    if (error) throw error;

    if (snippets.length > 0) continue; // skip embedding creation if the file has already been embedded

    const res = await fetch("/api/embeddings/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file_name: custom_file.name,
        file_id: custom_file.id,
      }),
    });
    const data = await res.json();
  }
};

export const uploadAndEmbedFiles = async (files: File[], user_id: string) => {
  if (files.length > 0) {
    const uploaded_files = await uploadFiles(files, user_id);
    toast.success("Files uploaded");
    await embedFiles(uploaded_files);
    toast.success("Files embedded");
  }
};
