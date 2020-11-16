import React from "react";

import StatefulTable from "./StatefulTable";
import BaseTable from "./BaseTable";
import SortingColumnHeader from "./SortingColumnHeader";

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
}) =>
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

Table.propTypes = {
  ...BaseTable.propTypes,
  ...StatefulTable.propTypes,
};

Table.defaultProps = {
  ...BaseTable.defaultProps,
  ...StatefulTable.defaultProps,
};

export default Table;
