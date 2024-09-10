import React from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../Checkbox";

export const SELECTABLE_COLUMN_DATA_KEY = "selected";

const selectHeaderFormatter = (onSelectHeader, isHeaderSelected, selectAllAriaLabel, deselectAllAriaLabel) => () => {
  const { t } = useTranslation();
  const checkedAriaLabel = deselectAllAriaLabel || t("deselect all");
  const uncheckedAriaLabel = selectAllAriaLabel || t("select all");
  const ariaLabel = isHeaderSelected ? checkedAriaLabel : uncheckedAriaLabel;
  return <Checkbox checked={isHeaderSelected} onChange={onSelectHeader} aria-label={ariaLabel} />;
};

const SelectCell = ({ row, onSelectRow }) => {
  const selectRowHandler = () => onSelectRow(row);
  const checked = row[SELECTABLE_COLUMN_DATA_KEY];
  const { t } = useTranslation();
  const checkedAriaLabel = row.selectAriaLabel || t("select row");
  const uncheckedAriaLabel = row.deselectAriaLabel || t("select row");
  const ariaLabel = checked ? checkedAriaLabel : uncheckedAriaLabel;
  return <Checkbox aria-label={ariaLabel} checked={checked} onChange={selectRowHandler} />;
};

const selectCellRenderer = (onSelectRow) => (props) => <SelectCell onSelectRow={onSelectRow} {...props} />;

export const addSelectableControl = ({
  columns,
  rows,
  onSelectRow,
  onSelectHeader,
  keyField,
  selectedRows,
  isHeaderSelected,
  selectAllAriaLabel,
  deselectAllAriaLabel,
}) => {
  const selectableColumn = {
    dataKey: SELECTABLE_COLUMN_DATA_KEY,
    cellFormatter: selectCellRenderer(onSelectRow),
    headerFormatter: selectHeaderFormatter(onSelectHeader, isHeaderSelected, selectAllAriaLabel, deselectAllAriaLabel),
    width: "30px",
  };
  const selectableCellData = (rowKey) => ({
    [SELECTABLE_COLUMN_DATA_KEY]: selectedRows.includes(rowKey),
  });
  const transformedColumns = [selectableColumn, ...columns];
  const transformedRows = rows.map((row) => ({
    ...selectableCellData(row[keyField]),
    ...row,
  }));
  return {
    rows: transformedRows,
    columns: transformedColumns,
  };
};
