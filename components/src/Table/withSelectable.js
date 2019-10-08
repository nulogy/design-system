import React from "react";
import { Checkbox } from "../Checkbox";

const addSelectableColumn = ({ columns, rows, onSelectRow, onSelectHeader, keyField, selectedRows }) => {
  const SELECTABLE_COLUMN_DATA_KEY = "selectable1";
  const selectCellRenderer = (cellData, columnData, row) => {
    const selectRowHandler = () => onSelectRow(row);
    return (
      <Checkbox
        aria-label="toggle row selection"
        checked={row[SELECTABLE_COLUMN_DATA_KEY]}
        onChange={selectRowHandler}
      />
    );
  };

  const selectHeaderRenderer = () => (
    <Checkbox id="selectable-1" checked={false} onChange={onSelectHeader} aria-label="toggle all row selections" />
  );
  const selectableColumn = {
    label: "Select All",
    dataKey: SELECTABLE_COLUMN_DATA_KEY,
    cellRenderer: selectCellRenderer,
    headerRenderer: selectHeaderRenderer
  };
  const selectableCell = id => ({
    [SELECTABLE_COLUMN_DATA_KEY]: selectedRows.includes(id)
  });
  const transformedColumns = [selectableColumn, ...columns];
  const transformedRows = rows.map(row => ({ ...selectableCell(row[keyField]), ...row }));
  return {
    rows: transformedRows,
    columns: transformedColumns
  };
};

const withSelectable = TableComponent => {
  return props => {
    const transformedTableData = addSelectableColumn(props);
    return <TableComponent rows={transformedTableData.rows} columns={transformedTableData.columns} />;
  };
};

export default withSelectable;
