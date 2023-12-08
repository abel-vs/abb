"use client";

import React, { useState, FC } from "react";
import { PDFViewerModal } from "./pdf-viewer-modal";
import { DocViewerModal } from "./doc-viewer-modal";

interface FileCardProps {
  fileName: string;
  fileType: "pdf" | "docx";
  filePath: string;
}

export const FileCard: FC<FileCardProps> = ({
  fileName,
  fileType,
  filePath,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <div
        onClick={openModal}
        className="cursor-pointer border p-4 rounded-md shadow-lg"
      >
        <p>{fileName}</p>
      </div>
      {fileType === "pdf" ? (
        <PDFViewerModal
          isOpen={isOpen}
          filePath={filePath}
          onClose={closeModal}
        />
      ) : (
        <DocViewerModal
          isOpen={isOpen}
          filePath={filePath}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
