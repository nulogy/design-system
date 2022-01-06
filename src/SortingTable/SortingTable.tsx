import React, { useState } from "react";
import { Table, TableProps } from "../Table";

type SortingTableProps = TableProps & {
  initialSortColumn: string;
};

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

const SortingTable = ({
  columns: incomingColumns,
  rows: incomingRows,
  initialSortColumn,
  ...props
}: SortingTableProps) => {
  const [sortState, setSortState] = useState({
    ascending: true,
    sortColumn: initialSortColumn,
  });
  const [rows, setRows] = useState(() =>
    sortRows([...incomingRows], incomingColumns, sortState)
  );

  const onSortChange = (dataKey) => {
    let newSortState;

    setSortState((previousState) => {
      const ascending =
        previousState.sortColumn !== dataKey || !previousState.ascending;
      newSortState = { ascending, sortColumn: dataKey };

      return newSortState;
    });

    setRows((previousState) =>
      sortRows(previousState, incomingColumns, newSortState)
    );
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

  const columns = incomingColumns.map((column) => transformColumn(column));

  return <Table columns={columns} rows={rows} {...props} />;
};

export default SortingTable;
