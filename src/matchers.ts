import { regexes } from "./constants";

const hexRegExp = new RegExp(regexes.hex);

export function isHexString(value: string): boolean {
  return hexRegExp.test(value);
}

const decimalRegExp = new RegExp(regexes.decimal);

export function isDecimalString(value: string): boolean {
  return decimalRegExp.test(value);
}
