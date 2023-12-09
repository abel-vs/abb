import { fetchFile, downloadFile } from "@/lib/actions/pdf";
import { PDFViewer } from "./pdf-viewer";

export default async function Sample({ params }: { params: { id: string } }) {
  console.log("////////////////////");
  console.log(params.id);
  console.log("////////////////////");

  const id = params.id;
  const fileData = await fetchFile(id);
  const file = await downloadFile(fileData.file_path);

  return (
    <div className="w-full">
      <PDFViewer file={file} />
    </div>
  );
}
