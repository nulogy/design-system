import React, { useState } from "react";
import { Table } from "..";

const COLUMNS = [
  { label: "Name", dataKey: "name" },
  { label: "Species Type", dataKey: "type" },
];

const ROWS = [
  { name: "Antelope", type: "Mammal" },
  { name: "Dingo", type: "Mammal" },
  { name: "Chimpanzee", type: "Mammal" },
  { name: "Iguana", type: "Lizard" },
  { name: "Hippopotamus", type: "Mammal" },
  { name: "Flamingo", type: "Avian" },
  { name: "Giraffe", type: "Mammal" },
  { name: "Black Bear", type: "Mammal" },
  { name: "Elephant", type: "Mammal" },
];

const INITIAL_SORT_COLUMN = "name";
const KEY_FIELD = "name";

// This uses alphabetical sorting, but could be changed to something custom
const numericAlphabeticalSort = (a, b) =>
  String(a).localeCompare(b, undefined, {
    numeric: false,
    sensitivity: "base",
  });

const applySort = (rows, sortColumn) =>
  rows.sort((a, b) => {
    return numericAlphabeticalSort(a[sortColumn], b[sortColumn]);
  });

const sortRows = (rows, sortState) => {
  const sortedRows = applySort(rows, sortState.sortColumn);

  return sortState.ascending ? sortedRows : sortedRows.reverse();
};

const TableWithCustomSorting = () => {
  const [sortState, setSortState] = useState({
    ascending: true,
    sortColumn: INITIAL_SORT_COLUMN,
  });
  const [rows, setRows] = useState(() => sortRows([...ROWS], sortState));

  const onSortChange = (dataKey) => {
    let newSortState;

    setSortState((previousState) => {
      const ascending = previousState.sortColumn !== dataKey || !previousState.ascending;
      newSortState = { ascending, sortColumn: dataKey };

      return newSortState;
    });

    setRows((previousState) => sortRows(previousState, newSortState));
  };

  const transformColumn = (column) => {
    const isAscending = sortState.ascending && column.dataKey === sortState.sortColumn;

    return {
      ...column,

      headerFormatter: ({ label, dataKey }) => (
        <Table.SortingHeader
          onChange={() => onSortChange(dataKey)}
          label={label}
          ascending={isAscending}
          active={dataKey === sortState.sortColumn}
        />
      ),
    };
  };

  const columns = COLUMNS.map((column) => transformColumn(column));

  return <Table columns={columns} rows={rows} keyField={KEY_FIELD} />;
};

export default {
  title: "Components/Table/with custom sorting",
};

export const WithCustomSorting = () => <TableWithCustomSorting />;

WithCustomSorting.story = {
  name: "with custom sorting",
};
