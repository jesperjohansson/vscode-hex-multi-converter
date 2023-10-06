import { convertASCIICharacterToText } from "./characters";

export function hexStringToDecimalString(word: string): string | null {
  const decimal = Number.parseInt(word, 16);

  if (Number.isNaN(decimal)) {
    return null;
  }

  return decimal.toString(10);
}

export function hexStringToASCIIString(word: string): string | null {
  const decimal = Number.parseInt(word, 16);

  if (Number.isNaN(decimal)) {
    return null;
  }

  return convertASCIICharacterToText(String.fromCharCode(decimal));
}

export function hexStringToBinaryString(
  word: string,
  // TODO: Make configurable?
  options: { numBits: number } = { numBits: 8 },
): string | null {
  const decimal = Number.parseInt(word, 16);

  if (Number.isNaN(decimal)) {
    return null;
  }

  const bits = [...decimal.toString(2)].slice(0, options.numBits);

  const arr = new Array(options.numBits).fill("0");

  arr.splice(-bits.length, bits.length, ...bits);

  return arr.join("");
}

export function decimalStringToHexString(
  word: string,
  // TODO: Make configurable?
  options: { prefix: string; upperCase: boolean; minLength: number } = {
    prefix: "0x",
    upperCase: false,
    minLength: 2,
  },
): string | null {
  const decimal = Number.parseInt(word, 10);

  if (Number.isNaN(decimal)) {
    return null;
  }

  let hex = decimal.toString(16);

  if (hex.length < options.minLength) {
    hex = `${"0".repeat(options.minLength - hex.length)}${hex}`;
  }

  return `${options.prefix}${options.upperCase ? hex.toUpperCase() : hex}`;
}
