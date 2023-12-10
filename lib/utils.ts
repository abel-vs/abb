import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { marked } from "marked";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitizeFileName = (name: string): string => {
  // Replace invalid characters with underscore
  return name.replace(/[^a-z0-9.-]/gi, "_");
};

export const extractSearchTextFromContent = (content: string): string => {
  let firstHeading = "";

  const renderer = new marked.Renderer();
  renderer.heading = (text: string, level: number): string => {
    if (!firstHeading) {
      firstHeading = text;
    }
    return "";
  };

  marked(content, { renderer });

  // if first heading is empty, pick first line
  if (firstHeading === "") {
    firstHeading = content.split(/[^A-Za-z\s]/)[0];
  }

  if (firstHeading === "") {
    let firstNumberedLine = content
      .split("\n")
      .find((line) => /^\d+\./.test(line));

    firstHeading = firstNumberedLine ? firstNumberedLine : "";
  }

  firstHeading = firstHeading.replace(/^[^a-zA-Z]+/, "");
  firstHeading = firstHeading.split(/[^A-Za-z\s]/)[0];

  console.log(firstHeading);

  return firstHeading;
};
