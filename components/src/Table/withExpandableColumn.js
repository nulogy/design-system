import React from "react";
import PropTypes from "prop-types";
import { ControlIcon } from "..";
import { rowPropType } from "./Table.types";
import { SELECTABLE_COLUMN_DATA_KEY } from "./withSelectableColumn";

const EXPANDABLE_COLUMN_DATA_KEY = "expanded";

const ExpandCell = ({ row, onExpandRow }) => {
  const expandRowHandler = () => onExpandRow(row);
  return (
    <>
      {row.expandedContent && (
        <ControlIcon
          icon={row[EXPANDABLE_COLUMN_DATA_KEY] ? "upArrow" : "downArrow"}
          label="toggle expansion"
          onClick={expandRowHandler}
        />
      )}
    </>
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
const addExpandableColumn = ({ columns, onExpandRow }) => {
  const expandableColumn = {
    dataKey: EXPANDABLE_COLUMN_DATA_KEY,
    cellFormatter: expandCellRenderer(onExpandRow),
    width: "30px"
  };
  const hasSelectableColumn = columns[0].dataKey === SELECTABLE_COLUMN_DATA_KEY;
  const transformedColumns = hasSelectableColumn
    ? [columns[0], expandableColumn, ...columns.slice(1)]
    : [expandableColumn, ...columns];
  return transformedColumns;
};

const addExpandableCell = ({ rows, keyField, expandedRows }) => {
  const expandableCellData = rowKey => {
    return {
      [EXPANDABLE_COLUMN_DATA_KEY]: expandedRows ? expandedRows.includes(rowKey) : false
    };
  };
  const transformedRows = rows.map(row => ({ ...expandableCellData(row[keyField]), ...row }));
  return transformedRows;
};

const withExpandableColumn = TableComponent => {
  return props => {
    const { rows, columns, keyField, expandedRows, onExpandRow } = props;
    const transformedRows = addExpandableCell({
      rows,
      keyField,
      expandedRows
    });
    const transformedColumns = addExpandableColumn({
      columns,
      onExpandRow
    });
    return <TableComponent {...props} rows={transformedRows} columns={transformedColumns} />;
  };
};

export default withExpandableColumn;
