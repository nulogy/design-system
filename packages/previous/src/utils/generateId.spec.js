import generateId from "./generateId";

describe("generate id", () => {
  it("returns the first id", () => {
    expect(generateId()).toEqual("random-id-1");
  });
  it("returns subsequent unique ids", () => {
    expect(generateId()).toEqual("random-id-2");
    expect(generateId()).toEqual("random-id-3");
    expect(generateId()).toEqual("random-id-4");
  });
});
