import { sanitizeFileName } from "@/lib/utils";
import { createClient } from "@/supabase/client";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import LoadingCircle from "./loading-circle";
import { Mic, UploadIcon } from "lucide-react";
import { TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

export const ImageUploadButton = ({
  setImageURL,
}: {
  setImageURL: (url: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleImageUpload = async (event: any) => {
    try {
      setLoading(true);
      const files: File[] = Array.from(event.target.files);
      if (files.length === 0) {
        return;
      }
      const file = files[0];
      const sanitized_name = sanitizeFileName(file.name);
      const { data: storageData, error } = await supabase.storage
        .from("images")
        .upload(`${sanitized_name}`, file); // Get url for the file.
      const { data: urlData, error: urlError } = await supabase.storage
        .from("images")
        .createSignedUrl(`${sanitized_name}`, 60);
      if (urlError) throw urlError;
      setImageURL(urlData.signedUrl);

      setLoading(false);
    } catch (e: any) {
      toast.error(e.message);
      console.error(e);
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} // hide the default file input
        onChange={handleImageUpload}
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={loading ? "default" : "icon"}
            onClick={handleClick}
            className={`transition-all duration-1000 ease-in-out`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <LoadingCircle />
                <p>Uploading...</p>
              </div>
            ) : (
              <UploadIcon />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Upload Image</TooltipContent>
      </Tooltip>
    </>
  );
};
