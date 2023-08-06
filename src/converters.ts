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
