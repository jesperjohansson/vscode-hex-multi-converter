import * as vscode from "vscode";
import { ConvertCallback, MatcherCallback } from "./types";
import { forEachLineIn, forEachWordIn } from "./lib";
import {
  binaryStringToHexString,
  decimalStringToHexString,
  hexStringToASCIIString,
  hexStringToBinaryString,
  hexStringToDecimalString,
} from "./converters";
import { isBinaryString, isDecimalString, isHexString } from "./matchers";
import { insertLineComment } from "./comments";

export function comment(
  editor: vscode.TextEditor | undefined,
  convert: ConvertCallback,
  matcher: MatcherCallback,
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
      forEachLineIn(editor, selection, (line) => {
        // Keeps track of mutable text and end index
        let lineText: string = line.text;
        let lineEndIndex: number = line.range.end.character;

        forEachWordIn(editor, selection, line, (word) => {
          if (matcher(word)) {
            const converted = convert(word);
            if (typeof converted === "string") {
              insertLineComment(
                line,
                lineText,
                lineEndIndex,
                converted,
                (comment, updatedLineText, updatedLineEndIndex) => {
                  // Update line text and end index for next iteration.
                  // Needed for multiple values on same line.
                  lineText = updatedLineText;
                  lineEndIndex = updatedLineEndIndex;

                  builder.insert(
                    new vscode.Position(line.lineNumber, lineEndIndex),
                    comment,
                  );
                },
              );
            }
          }
        });
      });
    }
  });
}

export function replace(
  editor: vscode.TextEditor | undefined,
  convert: ConvertCallback,
  matcher: MatcherCallback,
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
      forEachLineIn(editor, selection, (line) => {
        forEachWordIn(editor, selection, line, (word, wordIndex) => {
          if (matcher(word)) {
            const converted = convert(word);
            if (typeof converted === "string") {
              builder.replace(
                new vscode.Range(
                  line.lineNumber,
                  wordIndex,
                  line.lineNumber,
                  wordIndex + word.length,
                ),
                converted,
              );
            }
          }
        });
      });
    }
  });
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    // From hex conversions
    vscode.commands.registerCommand("hex-multi-converter.hexToDecimal", () => {
      const editor = vscode.window.activeTextEditor;
      replace(editor, hexStringToDecimalString, isHexString);
    }),
    vscode.commands.registerCommand(
      "hex-multi-converter.commentHexAsDecimal",
      () => {
        const editor = vscode.window.activeTextEditor;
        comment(editor, hexStringToDecimalString, isHexString);
      },
    ),
    vscode.commands.registerCommand("hex-multi-converter.hexToASCII", () => {
      const editor = vscode.window.activeTextEditor;
      replace(editor, hexStringToASCIIString, isHexString);
    }),
    vscode.commands.registerCommand(
      "hex-multi-converter.commentHexAsASCII",
      () => {
        const editor = vscode.window.activeTextEditor;
        comment(editor, hexStringToASCIIString, isHexString);
      },
    ),
    vscode.commands.registerCommand("hex-multi-converter.hexToBinary", () => {
      const editor = vscode.window.activeTextEditor;
      replace(editor, hexStringToBinaryString, isHexString);
    }),
    vscode.commands.registerCommand(
      "hex-multi-converter.commentHexAsBinary",
      () => {
        const editor = vscode.window.activeTextEditor;
        comment(editor, hexStringToBinaryString, isHexString);
      },
    ),
    // To hex conversions
    vscode.commands.registerCommand("hex-multi-converter.decimalToHex", () => {
      const editor = vscode.window.activeTextEditor;
      replace(editor, decimalStringToHexString, isDecimalString);
    }),
    vscode.commands.registerCommand("hex-multi-converter.binaryToHex", () => {
      const editor = vscode.window.activeTextEditor;
      replace(editor, binaryStringToHexString, isBinaryString);
    }),
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
