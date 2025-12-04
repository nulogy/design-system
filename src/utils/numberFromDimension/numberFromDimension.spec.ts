import { describe, it, expect } from "vitest";
import numberFromDimension from ".";

describe("numberFromDimension", () => {
  it("returns the numerical value from a css dimension", () => {
    const dimension = "12px";
    const numericalValue = 12;

    expect(numberFromDimension(dimension)).toEqual(numericalValue);
  });

  it("handles any css unit", () => {
    const dimension = "12deg";
    const numericalValue = 12;

    expect(numberFromDimension(dimension)).toEqual(numericalValue);
  });
});
