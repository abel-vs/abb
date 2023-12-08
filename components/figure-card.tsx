"use client";

import React, { useState, FC } from "react";
import Image from "next/image";

interface FigureModalProps {
  src: string;
  onClose: () => void;
}

const FigureModal: FC<FigureModalProps> = ({ src, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="relative max-w-4xl max-h-full overflow-auto">
        <Image
          src={src}
          alt="Modal Image"
          width={400}
          height={300}
          style={{ width: "100%", height: "100%" }}
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-secondary p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

interface ImageViewerProps {
  src: string;
}

const FigureCard: FC<ImageViewerProps> = ({ src }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <div onClick={openModal} className="cursor-pointer">
        <Image
          src={src}
          alt="Displayed Image"
          width={380}
          height={200}
          className="rounded-sm"
        />
      </div>
      {isModalOpen && <FigureModal src={src} onClose={closeModal} />}
    </div>
  );
};

export default FigureCard;
