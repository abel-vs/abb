"use client";
import { FunctionCallPayload, Message } from "ai";
import { FileSnippetCardFromId } from "../file-snippet-card";
import { FileSelector } from "../file-selector";
import { DialogDemo } from "../dialog-demo";
import LoadingCircle from "../loading-circle";

export default function renderFunctionCall(function_call: FunctionCallPayload) {
  const name = function_call.name;
  const args: any = function_call.arguments;
  switch (function_call.name) {
    case "retrieve_information":
      //don't render the query call
      if (args.query) {
        return (
          <div className="flex items-center gap-2">
            <LoadingCircle />
            <p>Retrieving information...</p>
          </div>
        );
      }
      const file_snippets = args;
      if (file_snippets.length === 0) {
        return <p>No relevant info found</p>;
      }
      return (
        <div className="flex flex-wrap gap-2 items-center justify-start">
          {file_snippets.map((snippet: any, index: any) => (
            <FileSnippetCardFromId key={index} id={snippet.id} />
          ))}
        </div>
      );
    case "list_files":
      return <FileSelector />;
    case "show_references":
      const reference_ids = args.reference_ids || [];
      console.log("Showing", reference_ids);
      if (reference_ids.length === 0) {
        return <p>No references found</p>;
      }
      return (
        <div className="flex flex-wrap gap-2 items-center justify-start">
          {reference_ids.map((id, index) => (
            <FileSnippetCardFromId key={index} id={id} />
          ))}
        </div>
      );
    default:
      return <p>Unknown function</p>;
  }
}
