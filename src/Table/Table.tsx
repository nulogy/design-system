import React from "react";
import StatefulTable from "./StatefulTable";
import BaseTable from "./BaseTable";
import SortingColumnHeader from "./SortingColumnHeader";
import { StatefulTableProps } from './StatefulTable';

const Table = ({
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
}: StatefulTableProps) =>
  hasSelectableRows || rowsPerPage || hasExpandableRows ? (
    <StatefulTable
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
Table.SortingHeader = SortingColumnHeader;

export default Table;
