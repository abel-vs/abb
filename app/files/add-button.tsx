"use client";
import LoadingCircle from "@/components/loading-circle";
import { Button } from "@/components/ui/button";
import { uploadAndEmbedFiles } from "@/lib/actions/files";
import { useAuth } from "@/lib/providers/supabase-auth-provider";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import toast from "react-hot-toast";

function FileUploadButton() {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) throw new Error("No user");

  const fileInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    // trigger the file input click event
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileUpload = async (event: any) => {
    try {
      setLoading(true);
      const files: File[] = Array.from(event.target.files);
      console.log("Files", files);
      console.log("User", user);
      await uploadAndEmbedFiles(files, user.id);
      router.refresh();
      setLoading(false);
    } catch (e: any) {
      toast.error(e.message);
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }} // hide the default file input
        onChange={handleFileUpload}
      />
      <Button onClick={handleClick}>
        {loading ? <LoadingCircle /> : "Upload Files"}
      </Button>
    </div>
  );
}

export default FileUploadButton;
