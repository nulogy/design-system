/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { storiesOf } from "@storybook/react";
import { Table, Text, Flex } from "..";
import { IconicButton } from "../Button";

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

const SortableColumnHeader = ({ onChange, label, ascending }) => (
  <Flex alignItems="center">
    <Text>{label}</Text>
    <IconicButton icon={ascending ? "downArrow" : "upArrow"} onClick={onChange} />
  </Flex>
);

const TableWithSorting = () => {
  const [rows, setRows] = useState(INITIAL_SORTED_ROWS);
  const [sortState, setSortState] = useState({
    name: false
  });

  const sortRows = sortObj => {
    const columnKey = Object.keys(sortState)[0];
    if (columnKey) {
      const sortedRows = getSortedRows(rows, columnKey, numericAlphabeticalSort);
      setRows(sortObj[columnKey] ? sortedRows : sortedRows.reverse());
    }
  };

  useEffect(() => {
    sortRows(sortState);
  }, [sortState]);

  const onSortChange = dataKey => {
    console.log(dataKey);
    return setSortState(state => ({
      [dataKey]: !state[dataKey]
    }));
  };
  const transformColumn = (column, onChange) => {
    const isAscending = sortState[column.dataKey] || false;
    return {
      ...column,
      headerFormatter: ({ label, dataKey }) => (
        <SortableColumnHeader onChange={() => onChange(dataKey, isAscending)} label={label} ascending={isAscending} />
      )
    };
  };
  const columns = COLUMNS.map(column => transformColumn(column, onSortChange));
  return <Table columns={columns} rows={rows} keyField="name" />;
};

storiesOf("Table", module).add("with sorting", () => <TableWithSorting />);
