"use client";
import { FunctionCallPayload, Message } from "ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FileSnippetCard } from "../file-snippet-card";
import { FileSelector } from "../file-selector";

export default function renderFunctionCall(function_call: FunctionCallPayload) {
  const name = function_call.name;
  const args: any = function_call.arguments;
  switch (function_call.name) {
    case "find_relevant_snippets":
      // Handle function1
      return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Find relevant snippets</CardTitle>
            <CardDescription>
              Retrieves file snippets relevant to the conversation.
            </CardDescription>
          </CardHeader>

          <CardContent>{function_call.content}</CardContent>
        </Card>
      );
    case "retrieve_information":
      return <p>Retrieving info</p>;
    case "list_files":
      return <FileSelector />;
    case "show_references":
      return (
        <div className="flex flex-col gap-2 items-center">
          {JSON.parse(function_call.content).map((item, index) => (
            <FileSnippetCard key={index} file_snippet={item} />
          ))}
        </div>
        // <Card className="w-full">
        //   <CardHeader>
        //     <CardTitle>Show references</CardTitle>
        //     <CardDescription>
        //       References used to create the answer.
        //     </CardDescription>
        //   </CardHeader>

        //   <CardContent>{function_call.content}</CardContent>
        // </Card>
      );
    default:
      return <p>Unknown function</p>;
  }
}
