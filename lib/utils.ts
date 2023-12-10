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

  return firstHeading;
};
