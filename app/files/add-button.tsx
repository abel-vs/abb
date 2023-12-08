"use client";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";

function FileUploadButton() {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    // trigger the file input click event
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    // handle the file here
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }} // hide the default file input
        onChange={handleFileChange}
      />
      <Button onClick={handleClick}>Upload Files</Button>
    </div>
  );
}

export default FileUploadButton;
