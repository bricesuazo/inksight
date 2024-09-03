import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertStringToArray(str: string) {
  if (str === "[]") return [];
  return str
    .slice(1, -1)
    .split(", ")
    .map((genre) => genre.replace(/'/g, ""));
}
