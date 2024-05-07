import React from "react";
import styled, { CSSObject } from "styled-components";
import { ColumnAlignment, ColumnType } from "./Table.types";

const StyledTableCell = styled.td<{ align?: ColumnAlignment; compact?: boolean }>(
  ({ align, compact, theme }): CSSObject => {
    const padding = compact ? theme.space.x1 : theme.space.x2;
    return {
      paddingTop: padding,
      paddingBottom: padding,
      textAlign: align,
      paddingRight: padding,
      "&:first-child": {
        paddingLeft: padding,
      },
    };
  }
);

export default function TableCell<Row>({
  row,
  column,
  colSpan,
  cellData,
  compact,
}: {
  column?: ColumnType<Row>;
  row?: Row;
  colSpan?: number;
  cellData?: React.ReactNode;
  compact?: boolean;
}) {
  const cellRenderer = row.cellRenderer || column.cellRenderer;
  const { cellFormatter } = column;
  const isCustomCell = Boolean(cellRenderer);

  const cellContent = cellFormatter ? cellFormatter({ cellData, column, row }) : cellData;

  if (isCustomCell) {
    return <td colSpan={colSpan}>{cellRenderer ? cellRenderer({ cellData, column, row }) : cellData}</td>;
  }

  return (
    <StyledTableCell align={column.align} compact={compact}>
      {cellContent}
    </StyledTableCell>
  );
}
