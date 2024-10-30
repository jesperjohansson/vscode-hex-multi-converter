import { regexes } from "./constants";

const hexRegExp = new RegExp(regexes.hex);
const hexExtendedRegExp = new RegExp(regexes.hexExtended);

export function isHexString(value: string, extended: boolean): boolean {
  const regExp = extended ? hexExtendedRegExp : hexRegExp;
  return regExp.test(value);
}

const decimalRegExp = new RegExp(regexes.decimal);

export function isDecimalString(value: string): boolean {
  return decimalRegExp.test(value);
}

const binaryRegExp = new RegExp(regexes.binary);

export function isBinaryString(value: string): boolean {
  return binaryRegExp.test(value);
}

export function isASCIIString(value: string) {
  for (let i = 0; i < value.length; i++) {
    const charCode = value.charCodeAt(i);

    if (charCode < 0 || charCode > 126) {
      return false;
    }
  }

  return true;
}
