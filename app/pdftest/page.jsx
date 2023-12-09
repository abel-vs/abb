"use client";

import React, { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function highlightPattern(text, pattern) {
  return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

export default function Test() {
  const [searchText, setSearchText] = useState("");

  const textRenderer = useCallback(
    (textItem) => highlightPattern(textItem.str, searchText),
    [searchText]
  );

  function onChange(event) {
    setSearchText(event.target.value);
  }

  return (
    <>
      <Document file="https://arxiv.org/pdf/1708.08021.pdf">
        <Page pageIndex={0} customTextRenderer={textRenderer} />
      </Document>
      <div>
        <label htmlFor="search">Search:</label>
        <input
          type="search"
          id="search"
          value={searchText}
          onChange={onChange}
        />
      </div>
    </>
  );
}
