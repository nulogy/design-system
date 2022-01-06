/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Table } from "..";

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

const numericAlphabeticalSort = (a, b, numeric) =>
  String(a).localeCompare(b, undefined, { numeric, sensitivity: "base" });

const applySort = (rows, sortColumn, columns) =>
  rows.sort((a, b) => {
    const column = columns.find((col) => col.dataKey === sortColumn);
    const { numeric } = column;

    return numericAlphabeticalSort(a[sortColumn], b[sortColumn], numeric);
  });

const sortRows = (rows, columns, sortState) => {
  const sortedRows = applySort(rows, sortState.sortColumn, columns);

  return sortState.ascending ? sortedRows : sortedRows.reverse();
};

const TableWithSorting = () => {
  const [sortState, setSortState] = useState({
    ascending: true,
    sortColumn: INITIAL_SORT_COLUMN,
  });
  const [rows, setRows] = useState(() =>
    sortRows([...ROWS], COLUMNS, sortState)
  );

  const onSortChange = (dataKey) => {
    let newSortState;

    setSortState((previousState) => {
      const ascending =
        previousState.sortColumn !== dataKey || !previousState.ascending;
      newSortState = { ascending, sortColumn: dataKey };

      return newSortState;
    });

    setRows((previousState) => sortRows(previousState, COLUMNS, newSortState));
  };

  const transformColumn = (column) => {
    const isAscending =
      sortState.ascending && column.dataKey === sortState.sortColumn;

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
  title: "Components/Table",
};

export const WithSorting = () => <TableWithSorting />;

WithSorting.story = {
  name: "with sorting",
};
/* eslint-enable react/prop-types */
