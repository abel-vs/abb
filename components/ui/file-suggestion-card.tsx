import React from "react";

import { File } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FileSuggestionCardProps {
  name: string;
}

const FileSuggestionCard = ({ name }: FileSuggestionCardProps) => {
  return (
    <Card className="bg-secondary rounded-md shadow-sm border-[0.5px] border-black h-36 w-36">
      <div className="flex flex-col items-center justify-center p-2 h-full w-full">
        <div className="h-12 w-12 pt-1">
          <File size={40} />
        </div>
        {/* <p className="p-2 text-xl break-all text-ellipsis overflow-hidden"> */}
        <p className="p-2 text-xl line-clamp-2 break-all">{name}</p>
      </div>
    </Card>
  );
};

export default FileSuggestionCard;
