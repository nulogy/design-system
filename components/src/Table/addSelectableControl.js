import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "../Checkbox";
import { rowPropType } from "./Table.types";

export const SELECTABLE_COLUMN_DATA_KEY = "selected";

const selectHeaderFormatter = (onSelectHeader, isHeaderSelected) => () => (
  <Checkbox checked={isHeaderSelected} onChange={onSelectHeader} aria-label="toggle all row selections" />
);

const SelectCell = ({ row, onSelectRow }) => {
  const selectRowHandler = () => onSelectRow(row);
  return (
    <Checkbox aria-label="toggle row selection" checked={row[SELECTABLE_COLUMN_DATA_KEY]} onChange={selectRowHandler} />
  );
};

SelectCell.propTypes = {
  row: rowPropType.isRequired,
  onSelectRow: PropTypes.func
};

SelectCell.defaultProps = {
  onSelectRow: null
};

const selectCellRenderer = onSelectRow => props => <SelectCell onSelectRow={onSelectRow} {...props} />;

export const addSelectableControl = ({
  columns,
  rows,
  onSelectRow,
  onSelectHeader,
  keyField,
  selectedRows,
  isHeaderSelected
}) => {
  const selectableColumn = {
    dataKey: SELECTABLE_COLUMN_DATA_KEY,
    cellFormatter: selectCellRenderer(onSelectRow),
    headerFormatter: selectHeaderFormatter(onSelectHeader, isHeaderSelected),
    width: "30px"
  };
  const selectableCellData = rowKey => ({
    [SELECTABLE_COLUMN_DATA_KEY]: selectedRows.includes(rowKey)
  });
  const transformedColumns = [selectableColumn, ...columns];
  const transformedRows = rows.map(row => ({ ...selectableCellData(row[keyField]), ...row }));
  return {
    rows: transformedRows,
    columns: transformedColumns
  };
};
