import * as vscode from "vscode";
import { ConversionOptions, ConvertCallback, MatcherCallback } from "./types";
import { forEachLineIn, forEachWordIn, insertLineComment } from "./lib";
import {
  hexStringToASCIIString,
  hexStringToBinaryString,
  hexStringToDecimalString,
} from "./converters";
import { isHexString } from "./matchers";

export function traverseWords(
  editor: vscode.TextEditor | undefined,
  convert: ConvertCallback,
  matcher: MatcherCallback,
  options: ConversionOptions,
) {
  if (!editor) {
    // No open editor
    return;
  }

  if (editor.selections.length < 1) {
    // No selections
    return;
  }

  return editor.edit((builder) => {
    for (const selection of editor.selections) {
      forEachLineIn(editor, selection, (line, lineIndex) => {
        forEachWordIn(editor, selection, line, (word, wordIndex) => {
          if (matcher(word)) {
            const converted = convert(word);
            if (typeof converted === "string") {
              if (options.comment) {
                insertLineComment(builder, line, converted);
              } else {
                builder.replace(
                  new vscode.Range(
                    lineIndex,
                    wordIndex,
                    lineIndex,
                    wordIndex + word.length,
                  ),
                  converted,
                );
              }
            }
          }
        });
      });
    }
  });
}

export function activate(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

  context.subscriptions.push(
    vscode.commands.registerCommand("hex-multi-converter.hexToDecimal", () => {
      traverseWords(editor, hexStringToDecimalString, isHexString, {
        comment: false,
      });
    }),
    vscode.commands.registerCommand(
      "hex-multi-converter.commentHexAsDecimal",
      () => {
        traverseWords(editor, hexStringToDecimalString, isHexString, {
          comment: true,
        });
      },
    ),
    vscode.commands.registerCommand("hex-multi-converter.hexToASCII", () => {
      traverseWords(editor, hexStringToASCIIString, isHexString, {
        comment: false,
      });
    }),
    vscode.commands.registerCommand(
      "hex-multi-converter.commentHexAsASCII",
      () => {
        traverseWords(editor, hexStringToASCIIString, isHexString, {
          comment: true,
        });
      },
    ),
    vscode.commands.registerCommand("hex-multi-converter.hexToBinary", () => {
      traverseWords(editor, hexStringToBinaryString, isHexString, {
        comment: false,
      });
    }),
    vscode.commands.registerCommand(
      "hex-multi-converter.commentHexAsBinary",
      () => {
        traverseWords(editor, hexStringToBinaryString, isHexString, {
          comment: true,
        });
      },
    ),
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
