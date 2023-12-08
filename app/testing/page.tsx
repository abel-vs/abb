import { FileCard } from "@/components/file-card";
import ContactCard from "@/components/ui/contact-card";
import FigureCard from "@/components/ui/figure-card";
import FileReferenceCard from "@/components/ui/file-reference-card";
import FileSuggestionCard from "@/components/ui/file-suggestion-card";
import React from "react";

const TestingPage = () => {
  return (
    <div>
      <FileReferenceCard name="BoatyMcBoatface.pdf" reference="page 7" />
      <FileSuggestionCard name="BoatyMcBoatface.pdf" />
      <FigureCard src="/dave.png" />
      <ContactCard
        email="halman@space.com"
        firstName="Dave"
        lastName="Bowman"
        phoneNumber="+358 2001 1968"
        title="Astronaut"
        src="/dave.png"
      />
      <FileCard
        fileName="Example Document"
        fileType="pdf"
        filePath="/path/to/your/file.pdf"
      />
      <FileCard
        fileName="Example Document"
        fileType="docx"
        filePath="/path/to/your/file.docx"
      />
    </div>
  );
};

export default TestingPage;
