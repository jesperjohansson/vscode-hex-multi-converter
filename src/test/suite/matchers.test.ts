import * as assert from "assert";

import { isHexString, isDecimalString } from "../../matchers";

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
});
