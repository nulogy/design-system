import React from "react";
import { Checkbox } from "../Checkbox";

const SELECTABLE_COLUMN_DATA_KEY = "selectable1";

const addSelectableColumn = ({ columns, rows, onSelectRow, onSelectHeader, keyField, selectedRows }) => {
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
    <Checkbox checked={false} onChange={onSelectHeader} aria-label="toggle all row selections" />
  );
  const selectableColumn = {
    dataKey: SELECTABLE_COLUMN_DATA_KEY,
    cellRenderer: selectCellRenderer,
    headerRenderer: selectHeaderRenderer
  };
  const selectableCellData = id => ({
    [SELECTABLE_COLUMN_DATA_KEY]: selectedRows.includes(id)
  });
  const transformedColumns = [selectableColumn, ...columns];
  const transformedRows = rows.map(row => ({ ...selectableCellData(row[keyField]), ...row }));
  return {
    rows: transformedRows,
    columns: transformedColumns
  };
};

const WithSelectableColumn = TableComponent => {
  return props => {
    const transformedTableData = addSelectableColumn(props);
    return <TableComponent rows={transformedTableData.rows} columns={transformedTableData.columns} />;
  };
};

export default WithSelectableColumn;
