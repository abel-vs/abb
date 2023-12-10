import { File } from "@/types/file";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import FileUploadButton from "./add-button";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

async function getData(): Promise<File[]> {
  const supabase = createClient(cookies());

  const { data, error } = await supabase.from("files").select();

  if (error) throw error;

  const files = data as File[];
  console.log(`Fetched ${files.length} files.`);
  // Fetch data from your API here.
  return [...files];
}

export default async function FilesPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <div className="flex w-full justify-between p-1 py-4">
        <h1 className="text-3xl font-bold">Files</h1>
        <FileUploadButton />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
