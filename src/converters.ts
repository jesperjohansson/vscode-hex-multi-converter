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

function formatBinaryString(
  binaryString: string,
  options: { numBits: number },
) {
  const bits = [...binaryString].slice(0, options.numBits);

  const arr = new Array(options.numBits).fill("0");

  arr.splice(-bits.length, bits.length, ...bits);

  return arr.join("");
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

  const binaryString = decimal.toString(2);

  return formatBinaryString(binaryString, options);
}

function formatHexString(
  hexString: string,
  options: { prefix: string; upperCase: boolean; minLength: number },
) {
  let hex = hexString;

  if (hexString.length < options.minLength) {
    hex = `${"0".repeat(options.minLength - hex.length)}${hex}`;
  }

  return `${options.prefix}${options.upperCase ? hex.toUpperCase() : hex}`;
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

  const hex = decimal.toString(16);

  return formatHexString(hex, options);
}

export function binaryStringToHexString(
  word: string,
  // TODO: Make configurable?
  options: {
    prefix: string;
    upperCase: boolean;
    minLength: number;
    numBits?: number;
  } = {
    prefix: "0x",
    upperCase: false,
    minLength: 2,
    numBits: undefined,
  },
) {
  const decimal = Number.parseInt(word, 2);

  if (Number.isNaN(decimal)) {
    return null;
  }

  const hex = decimal.toString(16);

  return formatHexString(hex, options);
}

export function asciiStringToHexString(
  word: string,
  // TODO: Make configurable?
  options: {
    prefix: string;
    upperCase: boolean;
    minLength: number;
    numBits?: number;
  } = {
    prefix: "0x",
    upperCase: false,
    minLength: 2,
    numBits: undefined,
  },
) {
  const chars = [...word];

  const out: string[] = [];

  for (const char of chars) {
    const charCode = char.charCodeAt(0);

    if (charCode >= 0 && charCode < 127) {
      out.push(formatHexString(charCode.toString(16), options));
    } else {
      return null;
    }
  }

  return out.join(" ");
}
