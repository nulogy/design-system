import React from "react";
import { useTranslation } from "react-i18next";
import { ControlIcon } from "../Button";
import { SELECTABLE_COLUMN_DATA_KEY } from "./addSelectableControl";

const EXPANDABLE_COLUMN_DATA_KEY = "expanded";

type Row = Record<string, number | string | boolean | React.ReactNode | Record<string, unknown>>;

interface ExpandCellProps {
  row: Row;
  onRowExpansionChange: (row: Row) => void;
  collapseAriaLabel?: string;
  expandAriaLabel?: string;
}

const ExpandCell = ({ row, onRowExpansionChange }: ExpandCellProps) => {
  const expandRowHandler = () => onRowExpansionChange(row);
  const { t } = useTranslation();
  const collapseLabel = row.collapseAriaLabel || t("collapse row");
  const expandLabel = row.expandAriaLabel || t("expand row");
  return (
    <>
      {row.expandedContent && (
        <ControlIcon
          icon={row[EXPANDABLE_COLUMN_DATA_KEY] ? "upArrow" : "downArrow"}
          label={row[EXPANDABLE_COLUMN_DATA_KEY] ? collapseLabel : expandLabel}
          onClick={expandRowHandler}
        />
      )}
    </>
  );
};

const expandCellRenderer = (onRowExpansionChange) => (props) => (
  <ExpandCell onRowExpansionChange={onRowExpansionChange} {...props} />
);

const addExpandableColumn = ({ columns, onRowExpansionChange }) => {
  const expandableColumn = {
    dataKey: EXPANDABLE_COLUMN_DATA_KEY,
    cellFormatter: expandCellRenderer(onRowExpansionChange),
    width: "30px",
  };
  const hasSelectableColumn = columns[0].dataKey === SELECTABLE_COLUMN_DATA_KEY;
  const transformedColumns = hasSelectableColumn
    ? [columns[0], expandableColumn, ...columns.slice(1)]
    : [expandableColumn, ...columns];
  return transformedColumns;
};

const addExpandableCell = ({ rows, keyField, expandedRows }) => {
  const expandableCellData = (rowKey) => {
    return {
      [EXPANDABLE_COLUMN_DATA_KEY]: expandedRows ? expandedRows.includes(rowKey) : false,
    };
  };
  const transformedRows = rows.map((row) => ({
    ...expandableCellData(row[keyField]),
    ...row,
  }));
  return transformedRows;
};

export const addExpandableControl = (props) => ({
  rows: addExpandableCell(props),
  columns: addExpandableColumn(props),
});
