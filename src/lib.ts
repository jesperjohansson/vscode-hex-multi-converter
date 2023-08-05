import * as vscode from "vscode";
import { commentSymbols, regexes } from "./constants";

export function getLineEndIndex(line: vscode.TextLine) {
  const lineCommentIndex = line.text.lastIndexOf(commentSymbols.slashes);

  // Could handle previous character being escaping character here...
  if (lineCommentIndex >= 0 && lineCommentIndex < line.range.end.character) {
    return lineCommentIndex;
  }

  return line.range.end.character;
}

export function findFirstWordRangeIn(
  selection: vscode.Selection,
  line: vscode.TextLine,
  fromCharIndex: number,
): vscode.Range | undefined {
  const lineEndIndex = getLineEndIndex(line);

  const lineLen = lineEndIndex - line.range.start.character;

  const charRegExp = new RegExp(regexes.character);

  const acc: string[] = [];
  for (let i = fromCharIndex; i < lineLen; i++) {
    // Check if not a "word character"
    if (!charRegExp.test(line.text[i])) {
      // Not a word character. Return result if there were any characters collected.
      if (acc.length > 0) {
        return new vscode.Range(
          line.lineNumber,
          i - acc.length,
          line.lineNumber,
          i,
        );
      }
    } else {
      // Save word character for next iteration
      acc.push(line.text[i]);
    }
  }

  // Handles end of line
  if (acc.length > 0) {
    return new vscode.Range(
      line.lineNumber,
      lineEndIndex - acc.length,
      line.lineNumber,
      lineEndIndex,
    );
  }
}

function isSelectionStartLine(
  line: vscode.TextLine,
  selection: vscode.Selection,
): boolean {
  return line.lineNumber === selection.start.line;
}

function isSelectionEndLine(
  line: vscode.TextLine,
  selection: vscode.Selection,
): boolean {
  return line.lineNumber === selection.end.line;
}

export function forEachWordIn(
  editor: vscode.TextEditor,
  selection: vscode.Selection,
  line: vscode.TextLine,
  callback: (word: string, index: number) => void,
) {
  const lineLen = line.range.end.character - line.range.start.character;

  function iterate(charIndex: number) {
    if (editor) {
      const wordRange = findFirstWordRangeIn(selection, line, charIndex);

      if (wordRange) {
        const word = editor.document.getText(wordRange);

        callback(word, wordRange.start.character);

        const nextCharIndex = wordRange.end.character + 1;

        const lineEndIndex = isSelectionEndLine(line, selection)
          ? selection.end.character
          : lineLen;

        if (nextCharIndex > charIndex && nextCharIndex < lineEndIndex) {
          iterate(nextCharIndex);
        }
      }
    }
  }

  if (isSelectionStartLine(line, selection)) {
    iterate(selection.start.character);
  } else {
    iterate(line.firstNonWhitespaceCharacterIndex);
  }
}

export function forEachLineIn(
  editor: vscode.TextEditor,
  selection: vscode.Selection,
  callback: (line: vscode.TextLine, index: number) => void,
) {
  for (
    let lineIndex = selection.start.line;
    lineIndex <= selection.end.line;
    lineIndex++
  ) {
    const line = editor.document.lineAt(lineIndex);

    if (!line.isEmptyOrWhitespace) {
      callback(line, lineIndex);
    }
  }
}
