import * as assert from "assert";

import { isHexString, isDecimalString, isBinaryString } from "../../matchers";

suite("matchers", () => {
  test("isHexString", () => {
    assert.strictEqual(isHexString("0xff"), true);
    assert.strictEqual(isHexString("0xFF"), true);
    assert.strictEqual(isHexString("0x00"), true);
    assert.strictEqual(isHexString("#CCC"), true);
    assert.strictEqual(isHexString("#ffffffff"), true);
    assert.strictEqual(isHexString("FFF"), true);
    assert.strictEqual(isHexString("F"), true);
    assert.strictEqual(isHexString("5"), true);
    assert.strictEqual(isHexString(""), false);
    assert.strictEqual(isHexString("l"), false);
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
});
