import React from "react";
import styled from "styled-components";
import TableCell from "./TableCell";
import StyledTh from "./StyledTh";

const StyledFooterRow = styled.tr(({ theme }) => ({
  "&:first-of-type": {
    borderTop: `1px solid ${theme.colors.lightGrey}`,
  },
}));

function renderRows<Row, Column>(rows: Row[], columns: Column[], keyField: string, loading: boolean, compact: boolean) {
  return rows.map((row) => (
    <TableFooterRow row={row} columns={columns} key={row[keyField]} loading={loading} compact={compact} />
  ));
}

const TableFooterRow = ({ row, columns, loading, compact }) => {
  const columnsWithoutControls = columns.filter(
    (column) => column.dataKey !== "selected" && column.dataKey !== "expanded"
  );
  const numberOfControlColumns = columns.length - columnsWithoutControls.length;
  return (
    <StyledFooterRow>
      {columnsWithoutControls.map((column, index) =>
        index === 0 ? (
          <StyledTh key={column.dataKey} scope="row" colSpan={numberOfControlColumns + 1} compact={compact}>
            {row[column.dataKey]}
          </StyledTh>
        ) : (
          !loading && (
            <TableCell
              key={column.dataKey ?? column.key ?? index}
              row={row}
              column={{
                dataKey: column.dataKey,
                label: column.label,
                align: column.align,
              }}
              cellData={row[column.dataKey]}
              compact={compact}
            />
          )
        )
      )}
    </StyledFooterRow>
  );
};

type TableFootProps<Column, Row> = {
  columns: Column[];
  rows: Row[];
  keyField?: string;
  loading?: boolean;
  compact?: boolean;
};

function TableFoot<Column, Row>({ columns, rows, keyField, loading, compact }: TableFootProps<Column, Row>) {
  return <tfoot>{renderRows(rows, columns, keyField, loading, compact)}</tfoot>;
}

TableFoot.defaultProps = {
  keyField: "id",
  loading: false,
  compact: false,
};

export default TableFoot;
