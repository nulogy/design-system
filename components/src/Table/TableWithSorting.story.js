/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { storiesOf } from "@storybook/react";
import { Table } from "..";

const COLUMNS = [{ label: "Name", dataKey: "name" }, { label: "Population (x 1000)", dataKey: "population" }];

const ROWS = [
  { name: "Antelope", population: "50" },
  { name: "Dingo", population: "180" },
  { name: "Chimpanzee", population: "170" },
  { name: "Iguana", population: "4000" },
  { name: "Hippopotamus", population: "100" },
  { name: "Flamingo", population: "200" },
  { name: "Giraffe", population: "120" },
  { name: "Black Bear", population: "100" },
  { name: "Elephant", population: "130" }
];

const numericAlphabeticalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const getSortedRows = (rows, columnKey, sortFunction) => rows.sort((a, b) => sortFunction(a[columnKey], b[columnKey]));

const INITIAL_SORTED_ROWS = getSortedRows(ROWS, "name", numericAlphabeticalSort);

const TableWithSorting = () => {
  const [rows, setRows] = useState(INITIAL_SORTED_ROWS);
  const [sortState, setSortState] = useState({
    name: false,
    current: "name"
  });

  const sortRows = sortObj => {
    const columnKey = sortObj.current;
    if (columnKey) {
      const sortedRows = getSortedRows(rows, columnKey, numericAlphabeticalSort);
      setRows(sortObj[columnKey] ? sortedRows : sortedRows.reverse());
    }
  };

  useEffect(() => {
    sortRows(sortState);
  }, [sortState]);

  const onSortChange = dataKey => {
    return setSortState(state => ({
      ...state,
      [dataKey]: !state[dataKey],
      current: dataKey
    }));
  };
  const transformColumn = (column, onChange) => {
    const isAscending = sortState[column.dataKey] || false;
    return {
      ...column,
      headerFormatter: ({ label, dataKey }) => (
        <Table.SortingHeader
          onChange={() => onChange(dataKey, isAscending)}
          label={label}
          ascending={isAscending}
          active={dataKey === sortState.current}
        />
      )
    };
  };
  const columns = COLUMNS.map(column => transformColumn(column, onSortChange));
  return <Table columns={columns} rows={rows} keyField="name" />;
};

storiesOf("Table", module).add("with sorting (SkipStoryshot)", () => <TableWithSorting />);
