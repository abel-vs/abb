import { Badge, FileIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";

export const FileListCard = ({ file }: { file: any }) => {
  return (
    <Card className="w-full">
      <CardContent className="w-full flex flex-row items-center gap-4 p-4">
        <FileIcon className="h-10 w-10" />
        <CardTitle className="text-lg font-semibold truncate">
          {file.name}
        </CardTitle>
        <Button className="ml-auto" variant="outline">
          Open
          <ExternalLinkIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
