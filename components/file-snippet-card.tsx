import { createClient } from "@/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FileListCard } from "./file-list-card";
import { ExternalLinkIcon, FileIcon, FileTextIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import ReactMarkdown from "react-markdown";
import Modal from "./modal";
import { CustomMarkdown } from "./custom-markdown";

export const FileSnippetCardFromId = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [fileSnippet, setFileSnippet] = useState(null);
  const [file, setFile] = useState(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchFileSnippet() {
      const { data: snippetData, error: snippetError } = await supabase
        .from("file_snippets")
        .select("*")
        .eq("id", id)
        .single();

      if (snippetError) throw snippetError;

      setFileSnippet(snippetData);

      const { data: fileData, error: fileError } = await supabase
        .from("files")
        .select("*")
        .eq("id", snippetData.file_id)
        .single();

      if (fileError) throw fileError;

      setFile(fileData);

      setLoading(false);
    }
    fetchFileSnippet();
  }, [id]);

  if (loading || !fileSnippet || !file) {
    return null;
  }

  return <FileSnippetCard fileSnippet={fileSnippet} file={file} />;
};

export const FileSnippetCard = ({
  fileSnippet,
  file,
}: {
  fileSnippet: any;
  file: any;
}) => {
  const location = fileSnippet.metadata.location;
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <FileSnippetModal
        file_snippet={fileSnippet}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {/* <Card className="w-full">
        <CardHeader>
          <CardTitle className="truncate text-lg">{file?.name}</CardTitle>
          <CardDescription className="flex items-center justify-between"> */}
      {/* <p>
              {location.lines
                ? `From line ${location.lines.from} to line ${location.lines.to}.`
                : ""}
              {location.pages
                ? `From page ${location.pages.from} to page ${location.pages.to}.`
                : ""}
            </p> */}
      <Button variant="outline" onClick={() => setShowModal(true)}>
        {file?.name.length > 20
          ? file?.name.substring(0, 20) + "..."
          : file?.name}
        <ExternalLinkIcon className="ml-2 h-4 w-4" />
      </Button>
      {/* </CardDescription>
        </CardHeader>
      </Card> */}
    </>
  );
};

export const FileSnippetModal = ({
  file_snippet,
  showModal,
  setShowModal,
}: {
  file_snippet: any;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="flex flex-col gap-4 m-16 w-full h-2/3">
          <Card className="p-8 w-full overflow-auto">
            <CustomMarkdown content={file_snippet.content} />
          </Card>
          <Button className="w-full" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};
