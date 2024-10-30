import * as assert from "assert";

import {
  isHexString,
  isDecimalString,
  isBinaryString,
  isASCIIString,
} from "../../matchers";

suite("matchers", () => {
  test("isHexString", () => {
    assert.strictEqual(isHexString("0xff", false), true);
    assert.strictEqual(isHexString("0xFF", false), true);
    assert.strictEqual(isHexString("0x00", false), true);
    assert.strictEqual(isHexString("#CCC", false), true);
    assert.strictEqual(isHexString("#ffffffff", false), true);
    assert.strictEqual(isHexString("FFF", false), true);
    assert.strictEqual(isHexString("F", false), true);
    assert.strictEqual(isHexString("5", false), true);
    assert.strictEqual(isHexString("", false), false);
    assert.strictEqual(isHexString("l", false), false);
    assert.strictEqual(isHexString("0x12345", false), true);
    assert.strictEqual(isHexString("0x12345U", false), false);
  });

  test("isHexString - extended", () => {
    assert.strictEqual(isHexString("0xff", true), true);
    assert.strictEqual(isHexString("0xFF", true), true);
    assert.strictEqual(isHexString("0x00", true), true);
    assert.strictEqual(isHexString("#CCC", true), true);
    assert.strictEqual(isHexString("#ffffffff", true), true);
    assert.strictEqual(isHexString("FFF", true), true);
    assert.strictEqual(isHexString("F", true), true);
    assert.strictEqual(isHexString("5", true), true);
    assert.strictEqual(isHexString("", true), false);
    assert.strictEqual(isHexString("l", true), false);
    assert.strictEqual(isHexString("0x12345", true), true);
    assert.strictEqual(isHexString("0x12345U", true), true);
  });

  test("isDecimalString", () => {
    assert.strictEqual(isDecimalString("0"), true);
    assert.strictEqual(isDecimalString("00"), true);
    assert.strictEqual(isDecimalString("001"), true);
    assert.strictEqual(isDecimalString("1024"), true);
    assert.strictEqual(isDecimalString("1 024"), false);
    assert.strictEqual(isDecimalString("1.024"), false);
    assert.strictEqual(isDecimalString(""), false);
  });

  test("isBinaryString", () => {
    assert.strictEqual(isBinaryString("0"), true);
    assert.strictEqual(isBinaryString("00"), true);
    assert.strictEqual(isBinaryString("001"), true);
    assert.strictEqual(isBinaryString("00000000"), true);
    assert.strictEqual(isBinaryString("11111111"), true);
    assert.strictEqual(isBinaryString("01010101"), true);
    assert.strictEqual(isBinaryString("1010101010101"), true);
    assert.strictEqual(isBinaryString("00000002"), false);
    assert.strictEqual(isBinaryString("1024"), false);
    assert.strictEqual(isBinaryString("0x00"), false);
    assert.strictEqual(isBinaryString("l"), false);
    assert.strictEqual(isBinaryString(""), false);
  });

  test("isASCIIString", () => {
    assert.strictEqual(isASCIIString("abc"), true);
    assert.strictEqual(isASCIIString("001"), true);
    assert.strictEqual(isASCIIString("0$.1"), true);
    assert.strictEqual(isASCIIString("00.1"), true);
    assert.strictEqual(isASCIIString("\n"), true);
    assert.strictEqual(isASCIIString("~"), true);
    assert.strictEqual(isASCIIString("Ö"), false);
    assert.strictEqual(isASCIIString("åbc"), false);
    assert.strictEqual(isASCIIString("😃"), false);
  });
});
