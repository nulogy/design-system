export const extractValuesFromCsvString = (csv: string): string[] => {
  const quoteRegEx = /(["'])(?:(?=(\\?))\2.)*?\1/gim;
  const matchedValues = csv.match(quoteRegEx) || [];
  const quotedValues = matchedValues.map((str) => str.replace(/(["',])/g, ""));
  const values = Array.from(
    new Set(
      csv
        .replace(quoteRegEx, "")
        .split(",")
        .map((value) => value.trim())
        .filter((str) => str.length > 0)
        .concat(quotedValues)
    )
  );

  return values;
};
