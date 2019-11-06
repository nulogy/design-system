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
  const CustomizedCell = ({ renderer, cellData, colSpan }) => (
    <td colSpan={colSpan}>{renderer ? renderer({ cellData, column, row }) : cellData}</td>
  );
  if (isCustomCell) {
    return <CustomizedCell renderer={cellRenderer} cellData={children} colSpan={colSpan} />;
  }
  return <StyledTableCell align={column.align}>{cellContent}</StyledTableCell>;
};

TableCell.propTypes = {
  column: columnPropType.isRequired,
  row: rowPropType.isRequired,
  colSpan: PropTypes.number.isRequired
};

export default TableCell;
