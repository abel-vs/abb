"use client";

import React, { FC } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";

interface PDFViewerModalProps {
  isOpen: boolean;
  filePath: string;
  onClose: () => void;
}

export const PDFViewerModal: FC<PDFViewerModalProps> = ({
  isOpen,
  filePath,
  onClose,
}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-3xl m-auto flex-col flex rounded-lg">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div style={{ width: "750px" }}>
            <Viewer fileUrl="https://a6d33df9-a022-4f37-8370-b7fc3a7b1d2b.filesusr.com/ugd/61c46b_7cfbd6ec1d3b4b66847a3de47c8b1816.pdf" />
          </div>
        </Worker>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-5 text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
};
