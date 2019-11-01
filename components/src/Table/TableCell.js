import React from "react";
import styled from "styled-components";
import theme from "../theme";
import { columnPropType, rowPropType } from "./Table.types";

const getDefaultTableCellStyles = align => ({
  paddingTop: theme.space.x2,
  paddingBottom: theme.space.x2,
  textAlign: align
});

const StyledTableCell = styled.td(({ align, isCustomCell }) => ({
  paddingRight: theme.space.x2,
  "&:first-of-type": {
    paddingLeft: theme.space.x2
  },
  ...(isCustomCell ? null : getDefaultTableCellStyles(align))
}));

const TableCell = ({ row, column }) => {
  const isCustomCell = Boolean(column.cellRenderer);
  const renderCellContent = (renderer, cellData) => (renderer ? renderer({ cellData, column, row }) : cellData);
  return (
    <StyledTableCell align={column.align} isCustomCell={isCustomCell}>
      {renderCellContent(column.cellRenderer || column.cellFormatter, row[column.dataKey])}
    </StyledTableCell>
  );
};

TableCell.propTypes = {
  column: columnPropType.isRequired,
  row: rowPropType.isRequired
};

export default TableCell;
