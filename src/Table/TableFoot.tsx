import React from "react";
import styled from "styled-components";
import TableCell from "./TableCell";
import StyledTh from "./StyledTh";
import { RowType, Columns } from "./Table.types";

const StyledFooterRow = styled.tr(({ theme }) => ({
  "&:first-of-type": {
    borderTop: `1px solid ${theme.colors.lightGrey}`,
  },
}));

const renderRows = (rows, columns, keyField, loading, compact) =>
  rows.map((row) => (
    <TableFooterRow row={row} columns={columns} key={row[keyField]} loading={loading} compact={compact} />
  ));

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

function TableFoot<ColumnMetadata>({
  columns,
  rows,
  keyField = "id",
  loading = false,
  compact = false,
}: {
  columns: Columns<ColumnMetadata>;
  rows: RowType[];
  keyField?: string;
  loading?: boolean;
  compact?: boolean;
}) {
  return <tfoot>{renderRows(rows, columns, keyField, loading, compact)}</tfoot>;
}

export default TableFoot;
