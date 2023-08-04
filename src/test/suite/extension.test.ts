import * as assert from "assert";
import * as vscode from "vscode";

import { traverseWords } from "../../extension";
import { hexStringToDecimalString } from "../../converters";
import { isHexString } from "../../matchers";

async function createEditor(content: string) {
  const editor = await vscode.window.showTextDocument(
    await vscode.workspace.openTextDocument({
      content,
    }),
  );

  return editor;
}

suite("extension", () => {
  test("hexToDecimal - replace", async () => {
    const editor = await createEditor("Hello 0xff");

    editor.selections = [new vscode.Selection(0, 0, 0, 10)];

    await traverseWords(editor, hexStringToDecimalString, isHexString, {
      comment: false,
    });

    assert.strictEqual(editor.document.getText(), "Hello 255");
  });

  test("hexToDecimal - replace only selection", async () => {
    const editor = await createEditor("0x00 0xff");

    editor.selections = [new vscode.Selection(0, 5, 0, 9)];

    await traverseWords(editor, hexStringToDecimalString, isHexString, {
      comment: false,
    });

    assert.strictEqual(editor.document.getText(), "0x00 255");
  });

  test("hexToDecimal - create comment", async () => {
    const editor = await createEditor("Hello 0xff");

    editor.selections = [new vscode.Selection(0, 0, 0, 10)];

    await traverseWords(editor, hexStringToDecimalString, isHexString, {
      comment: true,
    });

    assert.strictEqual(editor.document.getText(), "Hello 0xff // 255");
  });

  test("hexToDecimal - create comment for only selection", async () => {
    const editor = await createEditor("0x00 0xff");

    editor.selections = [new vscode.Selection(0, 5, 0, 9)];

    await traverseWords(editor, hexStringToDecimalString, isHexString, {
      comment: true,
    });

    assert.strictEqual(editor.document.getText(), "0x00 0xff // 255");
  });
});
