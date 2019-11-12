import React from "react";
import PropTypes from "prop-types";
import { ControlIcon } from "..";
import { rowPropType } from "./Table.types";

const EXPANDABLE_COLUMN_DATA_KEY = "expanded";

const ExpandCell = ({ row, onExpandRow }) => {
  const expandRowHandler = () => onExpandRow(row);
  return (
    <ControlIcon
      icon={row[EXPANDABLE_COLUMN_DATA_KEY] ? "upArrow" : "downArrow"}
      label="toggle expansion"
      onClick={expandRowHandler}
    />
  );
};

ExpandCell.propTypes = {
  row: rowPropType.isRequired,
  onExpandRow: PropTypes.func
};

ExpandCell.defaultProps = {
  onExpandRow: null
};

const expandCellRenderer = onExpandRow => props => <ExpandCell onExpandRow={onExpandRow} {...props} />;

const addExpandableColumn = ({ columns, rows, onExpandRow, keyField, expandedRows }) => {
  const expandableColumn = {
    dataKey: EXPANDABLE_COLUMN_DATA_KEY,
    cellFormatter: expandCellRenderer(onExpandRow),
    width: "30px"
  };
  const expandableCellData = rowKey => ({
    [EXPANDABLE_COLUMN_DATA_KEY]: expandedRows && expandedRows.length ? expandedRows.includes(rowKey) : false
  });
  const transformedColumns = [expandableColumn, ...columns];
  const transformedRows = rows.map(row => ({ ...expandableCellData(row[keyField]), ...row }));
  return {
    rows: transformedRows,
    columns: transformedColumns
  };
};

const withExpandableColumn = TableComponent => {
  return props => {
    const transformedTableData = addExpandableColumn(props);
    return <TableComponent rows={transformedTableData.rows} columns={transformedTableData.columns} />;
  };
};

export default withExpandableColumn;
