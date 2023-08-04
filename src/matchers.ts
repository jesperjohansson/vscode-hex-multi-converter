import { regexes } from "./constants";

const hexRegExp = new RegExp(regexes.hex);

export function isHexString(value: string): boolean {
  return hexRegExp.test(value);
}
