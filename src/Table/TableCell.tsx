import React from "react";
import styled, { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";

type StyledTableCellProps = {
  align?: any;
  compact?: boolean;
  theme?: DefaultNDSThemeType;
};
const StyledTableCell: React.FC<React.PropsWithChildren<StyledTableCellProps>> = styled.td(
  ({ align, compact, theme }: StyledTableCellProps): CSSObject => {
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
type TableCellProps = {
  column?: any;
  row?: any;
  colSpan?: number;
  cellData?: object | React.ReactNode | boolean;
  compact?: boolean;
};
const TableCell: React.FC<React.PropsWithChildren<TableCellProps>> = ({ row, column, colSpan, cellData, compact }) => {
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
};
TableCell.defaultProps = {
  column: {},
  row: {},
  cellData: "",
  colSpan: undefined,
  compact: false,
};
export default TableCell;
