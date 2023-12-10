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
import { DialogDemo } from "./dialog-demo";
import { ExternalLinkIcon } from "lucide-react";

interface PdfViewerDialogProps {
  name: string;
  filePath: string;
  searchText?: string;
}

const PdfViewerDialog = ({
  name,
  filePath,
  searchText = "",
}: PdfViewerDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {name.length > 20 ? name.substring(0, 20) + "..." : name}
          <ExternalLinkIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="h-full w-full my-16">
        <DialogHeader className="overflow-scroll">
          <DialogTitle>PDF Viewer</DialogTitle>
          <PdfViewer filePath={filePath} searchText={searchText} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewerDialog;
