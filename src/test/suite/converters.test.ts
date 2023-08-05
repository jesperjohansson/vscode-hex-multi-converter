import * as assert from "assert";

import {
  hexStringToASCIIString,
  hexStringToBinaryString,
  hexStringToDecimalString,
} from "../../converters";

suite("converters", () => {
  test("hexStringToDecimalString", () => {
    assert.strictEqual(hexStringToDecimalString("0x00"), "0");
    assert.strictEqual(hexStringToDecimalString("0x05"), "5");
    assert.strictEqual(hexStringToDecimalString("0x10"), "16");
    assert.strictEqual(hexStringToDecimalString("0x20"), "32");
    assert.strictEqual(hexStringToDecimalString("0xff"), "255");
    assert.strictEqual(hexStringToDecimalString("n"), null);
  });

  test("hexStringToASCIIString", () => {
    assert.strictEqual(hexStringToASCIIString("0x41"), "A");
    assert.strictEqual(hexStringToASCIIString("0x48"), "H");
    assert.strictEqual(hexStringToASCIIString("0x78"), "x");
    assert.strictEqual(hexStringToASCIIString("l"), null);
  });

  test("hexStringToBinaryString", () => {
    assert.deepStrictEqual(hexStringToBinaryString("0x03"), "00000011");
    assert.deepStrictEqual(hexStringToBinaryString("0x10"), "00010000");
    assert.deepStrictEqual(hexStringToBinaryString("0x20"), "00100000");
    assert.deepStrictEqual(hexStringToBinaryString("0xff"), "11111111");
    assert.deepStrictEqual(hexStringToBinaryString("p"), null);
  });
});
