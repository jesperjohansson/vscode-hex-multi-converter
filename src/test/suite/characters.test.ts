import * as assert from "assert";

import {
  convertEscapeCharToText,
  convertControlCharToText,
} from "../../characters";

suite("characters", () => {
  test("convertEscapeCharToText", () => {
    assert.strictEqual(convertEscapeCharToText("\n"), "\\n");
    assert.strictEqual(convertEscapeCharToText("\r"), "\\r");
    assert.strictEqual(convertEscapeCharToText("\t"), "\\t");
    assert.strictEqual(convertEscapeCharToText("o"), "o");
    assert.strictEqual(convertEscapeCharToText(""), "");
    assert.strictEqual(convertEscapeCharToText("hello"), "hello");
  });

  test("convertControlCharToText", () => {
    assert.strictEqual(
      convertControlCharToText(String.fromCharCode(0x1b)),
      "ESC",
    );
    assert.strictEqual(
      convertControlCharToText(String.fromCharCode(0x04)),
      "EOT",
    );
    assert.strictEqual(
      convertControlCharToText(String.fromCharCode(0x0a)),
      "LF",
    );
    assert.strictEqual(convertControlCharToText("o"), "o");
    assert.strictEqual(convertControlCharToText(""), "");
    assert.strictEqual(convertControlCharToText("hello"), "hello");
  });
});
