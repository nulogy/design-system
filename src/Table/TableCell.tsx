import React, { CSSProperties } from "react";
import styled from "styled-components";
import { DefaultNDSThemeType } from "../theme";

type StyledTableCellProps = {
  align?: CSSProperties["textAlign"];
  compact?: boolean;
  verticalAlign?: CSSProperties["verticalAlign"];
  theme?: DefaultNDSThemeType;
};

const StyledTableCell = styled.td<StyledTableCellProps>(
  ({ align, compact, verticalAlign, theme }: StyledTableCellProps) => {
    const padding = compact ? theme.space.x1 : theme.space.x2;
    return {
      paddingTop: padding,
      paddingBottom: padding,
      textAlign: align,
      paddingRight: padding,
      verticalAlign: verticalAlign || "middle",
      "&:first-child": {
        paddingLeft: padding,
      },
    };
  }
);

type TableCellProps = {
  column?: any;
  row?: any;
  colSpan?: number;
  cellData?: Record<string, unknown> | React.ReactNode | boolean;
  compact?: boolean;
};

const TableCell = ({ column = {}, row = {}, cellData = "", colSpan = undefined, compact = false }: TableCellProps) => {
  const cellRenderer = row.cellRenderer || column.cellRenderer;
  const { cellFormatter } = column;
  const isCustomCell = Boolean(cellRenderer);
  const cellContent = cellFormatter ? cellFormatter({ cellData, column, row }) : cellData;
  if (isCustomCell) {
    return <td colSpan={colSpan}>{cellRenderer ? cellRenderer({ cellData, column, row }) : cellData}</td>;
  }
  return (
    <StyledTableCell align={column.align} compact={compact} verticalAlign={row.verticalAlign}>
      {cellContent}
    </StyledTableCell>
  );
};

export default TableCell;
