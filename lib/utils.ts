import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitizeFileName = (name: string): string => {
  // Replace invalid characters with underscore
  return name.replace(/[^a-z0-9.-]/gi, "_");
};
