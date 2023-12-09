import { createClient } from "@/supabase/client";
import { useState, useEffect } from "react";
import { FileListCard } from "./file-list-card";
import { Button } from "./ui/button";

export const FileSelector = () => {
  const [files, setFiles] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchFiles().then((data) => setFiles(data));
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      {(showAll ? files : files.slice(0, 5)).map((item, index) => (
        <FileListCard file={item} />
      ))}
      <Button className="w-full" onClick={() => setShowAll(!showAll)}>
        {showAll ? "Collapse" : "Show All"}
      </Button>
    </div>
  );
};

async function fetchFiles() {
  const supabase = createClient();
  const { data, error } = await supabase.from("files").select("*");
  return data || [];
}
