import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { ControlIcon } from "..";
import { rowPropType } from "./Table.types";
import { SELECTABLE_COLUMN_DATA_KEY } from "./addSelectableControl";

const EXPANDABLE_COLUMN_DATA_KEY = "expanded";

const ExpandCell = ({ row, onRowExpansionChange }) => {
  const expandRowHandler = () => onRowExpansionChange(row);
  const { t } = useTranslation();
  return (
    <>
      {row.expandedContent && (
        <ControlIcon
          icon={row[EXPANDABLE_COLUMN_DATA_KEY] ? "upArrow" : "downArrow"}
          label={row[EXPANDABLE_COLUMN_DATA_KEY] ? t("collapse row") : t("expand row")}
          onClick={expandRowHandler}
        />
      )}
    </>
  );
};

ExpandCell.propTypes = {
  row: rowPropType.isRequired,
  onRowExpansionChange: PropTypes.func
};

ExpandCell.defaultProps = {
  onRowExpansionChange: null
};
const expandCellRenderer = onRowExpansionChange => props => (
  <ExpandCell onRowExpansionChange={onRowExpansionChange} {...props} />
);
const addExpandableColumn = ({ columns, onRowExpansionChange }) => {
  const expandableColumn = {
    dataKey: EXPANDABLE_COLUMN_DATA_KEY,
    cellFormatter: expandCellRenderer(onRowExpansionChange),
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

export const addExpandableControl = props => ({
  rows: addExpandableCell(props),
  columns: addExpandableColumn(props)
});
