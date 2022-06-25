import numeral from "numberal";

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? "$0,0" : "$0,0.00");
}

export function fPercent(number) {
  return numeral(number / 100).format("0.0%");
}

export function fShortenNumber(number) {
  return numeral(number).format("0.00a").replace(".00", "");
}
export function fData(number) {
  return numeral(number).format("0.0 b");
}
