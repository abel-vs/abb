"use client";
import { FunctionCallPayload, Message } from "ai";
import { FileSnippetCardFromId } from "../file-snippet-card";
import { FileSelector } from "../file-selector";
import { DialogDemo } from "../dialog-demo";

export default function renderFunctionCall(function_call: FunctionCallPayload) {
  const name = function_call.name;
  const args: any = function_call.arguments;
  console.log("Rendering function call", function_call);
  switch (function_call.name) {
    case "retrieve_information":
      //don't render the query call
      if (args.query) {
        return "Retrieving information...";
      }
      const file_snippets = args;
      return (
        <div className="flex gap-2 items-center justify-start">
          {file_snippets.map((snippet, index) => (
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
