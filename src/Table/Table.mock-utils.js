export const getMockRows = (numRows) => {
  const rows = [];

  for (let i = 0; i < numRows; i += 1) {
    const row = {
      id: i,
      c1: `some data ${i}`,
      c2: "some data",
      c3: "some data",
      c4: "some data",
      c5: "some data",
      c6: "some data",
      c7: "some data",
      c8: "some data",
      c9: "some data",
      c10: "some data",
      c11: "some data",
      c12: "some data",
      c13: "some data",
      c14: "some data",
      c15: "some data",
      c16: "some data",
      c17: "some data",
      c18: "some data",
      c19: "some data",
      c20: "some data",
      c21: "some data",
    };

    rows.push(row);
  }

  return rows;
};

export const mockColumns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" },
  { label: "Column 4", dataKey: "c4" },
  { label: "Column 5", dataKey: "c5" },
  { label: "Column 6", dataKey: "c6" },
  { label: "Column 7", dataKey: "c7" },
  { label: "Column 8", dataKey: "c8" },
  { label: "Column 9", dataKey: "c9" },
  { label: "Column 10", dataKey: "c10" },
  { label: "Column 11", dataKey: "c11" },
  { label: "Column 12", dataKey: "c12" },
  { label: "Column 13", dataKey: "c13" },
  { label: "Column 14", dataKey: "c14" },
  { label: "Column 15", dataKey: "c15" },
  { label: "Column 16", dataKey: "c16" },
  { label: "Column 17", dataKey: "c17" },
  { label: "Column 18", dataKey: "c18" },
  { label: "Column 19", dataKey: "c19" },
  { label: "Column 20", dataKey: "c20" },
  { label: "Column 21", dataKey: "c21" },
];

export const getMockColumns = (n) =>
  Array.from({ length: n }, (_, i) => i + 1).map((item) => ({
    label: `Column ${item}`,
    dataKey: `c${item}`,
  }));
