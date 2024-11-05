type CSSUnit = string;
/**
 * Subtracts two CSS measurements using calc()
 * @param baseValue The starting CSS measurement
 * @param subtractValue The value to subtract (defaults to '1px')
 * @returns A CSS calc() expression
 */
export default function subPx(baseValue: CSSUnit, subtractValue?: CSSUnit): string {
  const valueToSubtract: CSSUnit = subtractValue ?? "1px";
  return `calc(${baseValue} - ${valueToSubtract})`;
}
