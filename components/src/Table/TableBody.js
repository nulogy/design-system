import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import { Box } from "../Box";

const rowType = PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]));
const columnType = PropTypes.shape({
  align: PropTypes.oneOf(["right", "left", "center"]),
  label: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  cellFormatter: PropTypes.func,
  cellRenderer: PropTypes.func,
  headerRenderer: PropTypes.func,
  width: PropTypes.string
});

const StyledNoRowsContainer = styled(Box)({
  padding: `${theme.space.x3} 0`,
  fontSize: theme.fontSizes.small,
  color: theme.colors.darkGrey
});

const StyledTextCell = styled.div(({ align }) => ({
  paddingTop: theme.space.x2,
  paddingBottom: theme.space.x2,
  textAlign: align
}));

const StyledTd = styled.td(({ width }) => ({
  width,
  paddingRight: theme.space.x2,
  "&:first-of-type": {
    paddingLeft: theme.space.x2
  }
}));

const StyledTr = styled.tr({
  "&:hover": {
    backgroundColor: theme.colors.whiteGrey
  }
});

const TextCell = ({ children, align }) => <StyledTextCell align={align}>{children}</StyledTextCell>;

TextCell.propTypes = {
  children: PropTypes.string,
  align: PropTypes.string
};

TextCell.defaultProps = {
  children: "",
  align: undefined
};

const textCellRenderer = (cellData, { cellFormatter, align }) => (
  <TextCell align={align}>{cellFormatter ? cellFormatter(cellData) : cellData}</TextCell>
);

const renderCellContent = (row, { cellRenderer, dataKey, ...columnOptions }) => {
  const renderer = cellRenderer || textCellRenderer;

  return renderer(row[dataKey], columnOptions, row);
};

const renderAllRows = (rows, columns, keyField) =>
  rows.map(row => <TableBodyRow row={row} columns={columns} key={row[keyField]} />);

const TableBodyRow = ({ row, columns }) => (
  <StyledTr>
    {columns.map(column => (
      <StyledTd key={column.dataKey} width={column.width}>
        {renderCellContent(row, column)}
      </StyledTd>
    ))}
  </StyledTr>
);

TableBodyRow.propTypes = {
  row: rowType.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired
};

const NoRowsContainer = ({ colSpan, children }) => (
  <tr>
    <td colSpan={colSpan}>
      <StyledNoRowsContainer>{children}</StyledNoRowsContainer>
    </td>
  </tr>
);

NoRowsContainer.propTypes = {
  colSpan: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

const TableBody = ({ rows, columns, keyField, noRowsContent }) => (
  <tbody>
    {rows.length > 0 ? (
      renderAllRows(rows, columns, keyField)
    ) : (
      <NoRowsContainer colSpan={columns.length - 1}>{noRowsContent}</NoRowsContainer>
    )}
  </tbody>
);

TableBody.propTypes = {
  columns: PropTypes.arrayOf(columnType).isRequired,
  rows: PropTypes.arrayOf(rowType).isRequired,
  noRowsContent: PropTypes.string,
  keyField: PropTypes.string
};
TableBody.defaultProps = {
  noRowsContent: "No records have been created for this table.",
  keyField: "id"
};

export default TableBody;
