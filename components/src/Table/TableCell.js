import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import { columnPropType, rowPropType } from "./Table.types";

const StyledTableCell = styled.td(({ align, compact }) => {
  const padding = compact ? theme.space.x1 : theme.space.x2;
  return {
    paddingTop: padding,
    paddingBottom: padding,
    textAlign: align,
    paddingRight: padding,
    "&:first-child": {
      paddingLeft: padding
    }
  };
});

const TableCell = ({ row, column, colSpan, cellData, compact }) => {
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

TableCell.propTypes = {
  column: columnPropType,
  row: rowPropType,
  colSpan: PropTypes.number,
  cellData: PropTypes.oneOfType([PropTypes.object, PropTypes.node, PropTypes.bool]),
  compact: PropTypes.bool
};

TableCell.defaultProps = {
  column: {},
  row: {},
  cellData: "",
  colSpan: null,
  compact: false
};

export default TableCell;
