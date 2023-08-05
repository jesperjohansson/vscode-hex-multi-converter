import * as vscode from "vscode";
import { commentSymbols, regexes } from "./constants";
import { InsertLineCommentCallback } from "./types";

function escapeComment(comment: string) {
  const newLineRegExp = new RegExp(regexes.newline);

  // TODO: Options for escape characters

  return comment.replace(newLineRegExp, "\\n");
}

function findExistingLineCommentRange(
  line: vscode.TextLine,
  lineText: string,
  lineEndIndex: number,
): vscode.Range | undefined {
  if (!line.isEmptyOrWhitespace) {
    const slashesIndex = lineText.lastIndexOf(commentSymbols.slashes);

    if (slashesIndex >= 0) {
      return new vscode.Range(
        line.lineNumber,
        slashesIndex,
        line.lineNumber,
        lineEndIndex,
      );
    }
  }
}

export function insertLineComment(
  line: vscode.TextLine,
  lineText: string,
  lineEndIndex: number,
  converted: string,
  callback: InsertLineCommentCallback,
) {
  const escapedComment = escapeComment(converted);

  const existingLineCommentRange = findExistingLineCommentRange(
    line,
    lineText,
    lineEndIndex,
  );

  if (existingLineCommentRange) {
    const comment = ` ${escapedComment}`;

    const updatedLineText = lineText + comment;
    const updatedLineEndIndex =
      existingLineCommentRange.end.character + comment.length;

    callback(comment, updatedLineText, updatedLineEndIndex);
  } else {
    // Add a space to the left of the new comment if needed
    const spaceLeft = lineText[lineEndIndex] === " " ? "" : " ";
    const comment = `${spaceLeft}${commentSymbols.slashes} ${escapedComment}`;

    const updatedLineText = lineText + comment;
    const updatedLineEndIndex = lineEndIndex + comment.length;

    callback(comment, updatedLineText, updatedLineEndIndex);
  }
}
