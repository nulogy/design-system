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

const TableCell = ({ row, column, colSpan, cellData }) => {
  const cellRenderer = row.cellRenderer || column.cellRenderer;
  const { cellFormatter } = column;
  const isCustomCell = Boolean(cellRenderer);
  const cellContent = cellFormatter ? cellFormatter({ cellData, column, row }) : cellData;
  if (isCustomCell) {
    return <td colSpan={colSpan}>{cellRenderer ? cellRenderer({ cellData, column, row }) : cellData}</td>;
  }
  return <StyledTableCell align={column.align}>{cellContent}</StyledTableCell>;
};

TableCell.propTypes = {
  column: columnPropType,
  row: rowPropType,
  colSpan: PropTypes.number,
  cellData: PropTypes.oneOfType([PropTypes.node, PropTypes.bool])
};

TableCell.defaultProps = {
  column: {},
  row: {},
  cellData: "",
  colSpan: null
};

export default TableCell;
