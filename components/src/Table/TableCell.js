import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import { columnPropType, rowPropType } from "./Table.types";

const StyledTableCell = styled.td(({ align }) => ({
  paddingTop: theme.space.x2,
  paddingBottom: theme.space.x2,
  textAlign: align,
  paddingRight: theme.space.x2,
  "&:first-child": {
    paddingLeft: theme.space.x2
  }
}));

const TableCell = ({ row, column, colSpan, children }) => {
  const cellRenderer = row.cellRenderer || column.cellRenderer;
  const { cellFormatter } = column;
  const isCustomCell = Boolean(cellRenderer);
  const cellContent = cellFormatter ? cellFormatter({ cellData: children, column, row }) : children;
  if (isCustomCell) {
    return <td colSpan={colSpan}>{cellRenderer ? cellRenderer({ cellData: children, column, row }) : children}</td>;
  }
  return <StyledTableCell align={column.align}>{cellContent}</StyledTableCell>;
};

TableCell.propTypes = {
  column: columnPropType.isRequired,
  row: rowPropType.isRequired,
  colSpan: PropTypes.number.isRequired,
  children: PropTypes.node
};

TableCell.defaultProps = {
  children: ""
};

export default TableCell;
