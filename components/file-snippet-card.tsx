import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

export const FileSnippetCard = async ({
  file_snippet,
}: {
  file_snippet: any;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{file_snippet.file.name}</CardTitle>
        <CardDescription>Reference: {file_snippet.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Snippet content</p>
        {JSON.stringify(file_snippet.metadata)}
      </CardContent>
    </Card>
  );
};
