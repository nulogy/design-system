import React from "react";
import { Checkbox } from "../Checkbox";

const SELECTABLE_COLUMN_DATA_KEY = "selected";

const selectHeaderRenderer = (onSelectHeader, isHeaderSelected) => () => (
  <Checkbox checked={isHeaderSelected} onChange={onSelectHeader} aria-label="toggle all row selections" />
);

const selectCellRenderer = onSelectRow => (cellData, columnData, row) => {
  const selectRowHandler = () => onSelectRow(row);
  return (
    <Checkbox aria-label="toggle row selection" checked={row[SELECTABLE_COLUMN_DATA_KEY]} onChange={selectRowHandler} />
  );
};

const addSelectableColumn = ({
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
    cellRenderer: selectCellRenderer(onSelectRow),
    headerRenderer: selectHeaderRenderer(onSelectHeader, isHeaderSelected)
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

const withSelectableColumn = TableComponent => {
  return props => {
    const transformedTableData = addSelectableColumn(props);
    return <TableComponent rows={transformedTableData.rows} columns={transformedTableData.columns} />;
  };
};

export default withSelectableColumn;
