import { extractValuesFromCsvString } from "./selectHelpers";

describe("selectHelpers.ts", () => {
  describe("extractValuesFromCsvString", () => {
    test.each`
      csv                                                                  | expected
      ${'Car, mug, chocolate cake, "water bottle", "t-shirt, black"'}      | ${["Car", "mug", "chocolate cake", "water bottle", "t-shirt black"]}
      ${'Car,mug,chocolate cake,"water bottle","t-shirt, black"'}          | ${["Car", "mug", "chocolate cake", "water bottle", "t-shirt black"]}
      ${'Car, Car, mug, chocolate cake, "water bottle", "t-shirt, black"'} | ${["Car", "mug", "chocolate cake", "water bottle", "t-shirt black"]}
    `("returns $expected when csv is $csv", ({ csv, expected }) => {
      expect(extractValuesFromCsvString(csv)).toStrictEqual(expected);
    });
  });
});
