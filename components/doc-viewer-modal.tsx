import React, { FC } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

interface DocViewerModalProps {
  isOpen: boolean;
  filePath: string;
  onClose: () => void;
}

export const DocViewerModal: FC<DocViewerModalProps> = ({
  isOpen,
  filePath,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-3xl m-auto flex-col flex rounded-lg">
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={[{ uri: filePath }]}
          style={{ height: "500px" }}
        />
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
