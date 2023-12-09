import { FileCard } from "@/components/file-card";
import PdfViewerDialog from "@/components/pdf-viewer-dialog";
import ContactCard from "@/components/ui/contact-card";
import FigureCard from "@/components/ui/figure-card";
import FileReferenceCard from "@/components/ui/file-reference-card";
import FileSuggestionCard from "@/components/ui/file-suggestion-card";
import React from "react";

const TestingPage = () => {
  return (
    <>
      {/* <FileReferenceCard name="BoatyMcBoatface.pdf" reference="page 7" />
      <FileSuggestionCard name="BoatyMcBoatface.pdf" />
      <FigureCard src="/dave.png" />
      <ContactCard
        email="halman@space.com"
        firstName="Dave"
        lastName="Bowman"
        phoneNumber="+358 2001 1968"
        title="Astronaut"
        src="/dave.png"
      /> */}
      {/* <FileCard
        fileName="Example"
        filePath="https://arxiv.org/pdf/1708.08021.pdf"
        fileType="pdf"
      /> */}

      <PdfViewerDialog filePath="sample.pdf" searchText="sales" />
    </>
  );
};

export default TestingPage;
