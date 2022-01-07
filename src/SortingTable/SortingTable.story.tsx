import React from "react";
import { SortingTable } from ".";

const COLUMNS = [
  { label: "Name", dataKey: "name" },
  { label: "Population (x 1000)", dataKey: "population", numeric: true },
];

const ROWS = [
  { name: "Antelope", population: "50" },
  { name: "Dingo", population: "180" },
  { name: "Chimpanzee", population: "170" },
  { name: "Iguana", population: "4000" },
  { name: "Hippopotamus", population: "100" },
  { name: "Flamingo", population: "200" },
  { name: "Giraffe", population: "120" },
  { name: "Black Bear", population: "100" },
  { name: "Elephant", population: "130" },
];

const INITIAL_SORT_COLUMN = "name";
const KEY_FIELD = "name";

export default {
  title: "Components/SortingTable",
  component: SortingTable,
};

export const _SortingTable = () => (
  <SortingTable
    columns={COLUMNS}
    rows={ROWS}
    keyField={KEY_FIELD}
    initialSortColumn={INITIAL_SORT_COLUMN}
  />
);
