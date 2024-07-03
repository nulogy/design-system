import React from "react";
import StatefulTable from "./StatefulTable";
import BaseTable from "./BaseTable";
import SortingColumnHeader from "./SortingColumnHeader";
import { StatefulTableProps } from "./StatefulTable";
import { ColumnType, RowType, CellInfoType } from "./Table.types";

export type TableProps<ColumnMetadata = unknown> = StatefulTableProps<ColumnMetadata>;
export type TableColumnType<ColumnMetadata = unknown> = ColumnType<ColumnMetadata>;
export type TableRowType = RowType;
export type TableCellInfoType<ColumnMetadata = unknown> = CellInfoType<ColumnMetadata>;

function Table<ColumnMetadata>({
  hasSelectableRows,
  rowsPerPage,
  hasExpandableRows,
  selectedRows,
  onRowSelectionChange,
  onRowExpansionChange,
  onPageChange,
  selectAllAriaLabel,
  deselectAllAriaLabel,
  paginationCss,
  paginationProps,
  ...props
}: TableProps<ColumnMetadata>) {
  return hasSelectableRows || rowsPerPage || hasExpandableRows ? (
    <StatefulTable<ColumnMetadata>
      hasExpandableRows={hasExpandableRows}
      hasSelectableRows={hasSelectableRows}
      onRowExpansionChange={onRowExpansionChange}
      onRowSelectionChange={onRowSelectionChange}
      selectedRows={selectedRows}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      selectAllAriaLabel={selectAllAriaLabel}
      deselectAllAriaLabel={deselectAllAriaLabel}
      paginationCss={paginationCss}
      paginationProps={paginationProps}
      {...props}
    />
  ) : (
    <BaseTable {...props} />
  );
}
Table.SortingHeader = SortingColumnHeader;

export default Table;
