"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import PdfViewer from "./pdf-viewer";

interface PdfViewerDialogProps {
  filePath: string;
  searchText?: string;
}

const PdfViewerDialog = ({
  filePath,
  searchText = "",
}: PdfViewerDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Open PDF</Button>
      </DialogTrigger>

      <DialogContent className="h-full">
        <DialogHeader className="overflow-scroll">
          <DialogTitle>PDF Viewer</DialogTitle>
          <PdfViewer filePath={filePath} searchText={searchText} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewerDialog;
