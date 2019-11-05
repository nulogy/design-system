/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { storiesOf } from "@storybook/react";
import { Table } from "..";
import { Input } from "../Input";

const COLUMNS = [{ label: "Name", dataKey: "name" }, { label: "Description", dataKey: "description" }];

const ROWS = [
  { name: "Albert Einstein", description: "scientist, physist" },
  { name: "Homer Simpson", description: "father, doh!" },
  { name: "Jane Austen", description: "author" },
  { name: "Charles Darwin", description: "biologist" },
  { name: "Regina Phalange", description: "doctor, alias" },
  { name: "Marie Curie", description: "scientist, chemist" },
  { name: "Kawhi Leonard", description: "athlete, basketball" },
  { name: "Rosalind Franklin", description: "scientist, chemist" },
  { name: "F. Scott Fitzgerald", description: "author" }
];

const transformColumn = (column, onChange) => {
  return {
    ...column,
    headerFormatter: ({ label, dataKey }) => (
      <ColumnHeaderWithFilter onChange={e => onChange(dataKey, e)} label={label} />
    )
  };
};

const ColumnHeaderWithFilter = ({ onChange, label }) => <Input labelText={`Filter by ${label}`} onChange={onChange} />;

const TableWithFilters = () => {
  const [rows, setRows] = useState(ROWS);
  const [filter, setFilter] = useState({});

  const filterRows = filterObj => {
    const filteredRows = Object.keys(filterObj).map(key =>
      ROWS.filter(row => row[key].toLowerCase().includes(filterObj[key].toLowerCase()))
    );
    const filteredRowsByLength = filteredRows.sort((a, b) => a.length - b.length);
    const commonRows =
      filteredRowsByLength.length > 1
        ? filteredRowsByLength[0].filter(row => filteredRowsByLength[1].includes(row))
        : filteredRowsByLength[0] || ROWS;
    setRows(commonRows);
  };
  useEffect(() => {
    filterRows(filter);
  }, [filter]);

  const onFilterInputChange = (dataKey, e) => {
    const filterValue = e.currentTarget.value;
    return setFilter(state => ({
      ...state,
      [dataKey]: filterValue
    }));
  };
  const columns = COLUMNS.map(column => transformColumn(column, onFilterInputChange));
  return <Table columns={columns} rows={rows} keyField="name" />;
};

storiesOf("Table", module).add("with filtering (SkipStoryshot)", () => <TableWithFilters />);
