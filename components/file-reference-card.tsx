import React from "react";

import { File } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FileReferenceProps {
  name: string;
  reference: string;
}

const FileReferenceCard = ({ name, reference }: FileReferenceProps) => {
  return (
    <Card className="flex items-center bg-secondary rounded-md shadow-sm border-[0.5px] border-black h-20 p-6 w-96">
      <File size={40} />
      <div className="flex-col">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Reference: {reference}</CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
};

export default FileReferenceCard;
