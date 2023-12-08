"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";

const HomePage = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div style={{ width: "750px" }}>
        <Viewer fileUrl="https://a6d33df9-a022-4f37-8370-b7fc3a7b1d2b.filesusr.com/ugd/61c46b_7cfbd6ec1d3b4b66847a3de47c8b1816.pdf" />
      </div>
    </Worker>
  );
};

export default HomePage;
