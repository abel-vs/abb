"use client";

import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface PdfViewerProps {
  filePath: string;
  searchText?: string;
}

const PdfViewer = ({ filePath, searchText = "" }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState(null);

  let matchCount = 0;
  let prevMarkedElement = null;

  function highlightPattern(text, pattern) {
    return text.replace(pattern, (value) => {
      matchCount++;
      if (prevMarkedElement) {
        prevMarkedElement.removeAttribute("id");
      }
      const mark = document.createElement("mark");
      mark.id = "target-element";
      mark.textContent = value;
      if (matchCount === 1 || matchCount === 2) {
        prevMarkedElement = mark;
      }
      return mark.outerHTML;
    });
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    scrollToElement("target-element");
  }

  const scrollToElement = async (elementId) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textRenderer = (textItem) => {
    return highlightPattern(textItem.str, searchText);
  };

  return (
    <Document
      file={filePath}
      onChange={onDocumentLoadSuccess}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          customTextRenderer={textRenderer}
        />
      ))}
    </Document>
  );
};

export default PdfViewer;
