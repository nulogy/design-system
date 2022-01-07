import React, { useState } from "react";
import { Table } from "../Table";
import type { TableProps } from "../Table";
import type { RowType, ColumnType } from "../Table/Table.types";

type SortingTableProps = TableProps & {
  initialSortColumn: string;
};

type SortableColumnType = ColumnType & { numeric?: boolean };

type SortState = {
  ascending: boolean;
  sortColumn: string;
};

const numericAlphabeticalSort = (a, b, numeric) =>
  String(a).localeCompare(b, undefined, { numeric, sensitivity: "base" });

const applySort = (
  rows: RowType[],
  sortColumn: string,
  columns: SortableColumnType[]
) =>
  [...rows].sort((a, b) => {
    const column = columns.find((col) => col.dataKey === sortColumn);
    const { numeric } = column;

    return numericAlphabeticalSort(a[sortColumn], b[sortColumn], numeric);
  });

const sortRows = (
  rows: RowType[],
  columns: SortableColumnType[],
  sortState: SortState
) => {
  const sortedRows = applySort(rows, sortState.sortColumn, columns);

  return sortState.ascending ? sortedRows : sortedRows.reverse();
};

const SortingTable: React.FC<SortingTableProps> = ({
  columns: incomingColumns,
  rows: incomingRows,
  initialSortColumn,
  ...props
}) => {
  const [sortState, setSortState] = useState<SortState>({
    ascending: true,
    sortColumn: initialSortColumn,
  });

  const [rows, setRows] = useState(() =>
    sortRows(incomingRows, incomingColumns, sortState)
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
