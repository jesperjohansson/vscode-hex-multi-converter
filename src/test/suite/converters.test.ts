import * as assert from "assert";

import {
  asciiStringToHexString,
  binaryStringToHexString,
  decimalStringToHexString,
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

  test("decimalStringToHexString", () => {
    assert.deepStrictEqual(decimalStringToHexString("255"), "0xff");
    assert.deepStrictEqual(decimalStringToHexString("0"), "0x00");
    assert.deepStrictEqual(decimalStringToHexString("05"), "0x05");
    assert.deepStrictEqual(decimalStringToHexString("512"), "0x200");
  });

  test("binaryStringToHexString", () => {
    assert.deepStrictEqual(binaryStringToHexString("00000110"), "0x06");
    assert.deepStrictEqual(binaryStringToHexString("11111111"), "0xff");
    assert.deepStrictEqual(binaryStringToHexString("01"), "0x01");
    assert.deepStrictEqual(binaryStringToHexString("00000000"), "0x00");
    assert.deepStrictEqual(binaryStringToHexString("10000000"), "0x80");
  });

  test("asciiStringToHexString", () => {
    assert.deepStrictEqual(
      asciiStringToHexString("ascii"),
      "0x61 0x73 0x63 0x69 0x69",
    );
    assert.deepStrictEqual(asciiStringToHexString("\n"), "0x0a");
    assert.deepStrictEqual(asciiStringToHexString(" "), "0x20");
    assert.deepStrictEqual(asciiStringToHexString("~"), "0x7e");
    assert.deepStrictEqual(asciiStringToHexString("aå"), null);
  });
});
