import * as vscode from "vscode";

export type ConvertCallback = (word: string) => string | null;

export type MatcherCallback = (word: string) => boolean;

export interface ConversionOptions {
  comment: boolean;
}
