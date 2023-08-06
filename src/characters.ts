import * as vscode from "vscode";

import { characters } from "./constants";

export function convertEscapeCharToText(char: string): string {
  let out: string = char;

  for (const char of characters.escapes) {
    const regExp = new RegExp(char);
    out = out.replace(regExp, char);
  }

  return out;
}

export function convertControlCharToText(char: string): string {
  const decimal = char.charCodeAt(0);

  if (
    Number.isNaN(decimal) ||
    !characters.controls[decimal] ||
    !Number.isNaN(char.charCodeAt(1)) // Prevent non-control characters
  ) {
    return char;
  }

  return characters.controls[decimal];
}

export function convertASCIICharacterToText(char: string) {
  let out: string = char;

  const config = vscode.workspace.getConfiguration("hex-multi-converter");

  if (config.get("convertEscapeCharactersToText", true)) {
    out = convertEscapeCharToText(out);
  }

  if (config.get("convertControlCharactersToText", true)) {
    out = convertControlCharToText(out);
  }

  return out;
}
