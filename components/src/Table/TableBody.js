import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import { Box } from "../Box";
import { rowsPropType, columnsPropType, rowPropType } from "./Table.types";

const StyledMessageContainer = styled(Box)({
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

const TextCell = ({ children, cellFormatter, align }) => {
  return (
    <StyledTextCell align={align}>{cellFormatter ? cellFormatter({ cellData: children }) : children}</StyledTextCell>
  );
};

TextCell.propTypes = {
  children: PropTypes.string,
  align: PropTypes.string,
  cellFormatter: PropTypes.func
};

TextCell.defaultProps = {
  children: "",
  align: "left",
  cellFormatter: undefined
};

const renderCellContent = (row, { cellRenderer, dataKey, ...column }) =>
  cellRenderer ? (
    cellRenderer({ cellData: row[dataKey], column, row })
  ) : (
    <TextCell cellFormatter={column.cellFormatter} align={column.align}>
      {row[dataKey]}
    </TextCell>
  );

const renderRows = (rows, columns, keyField, noRowsContent) =>
  rows.length > 0 ? (
    rows.map(row => <TableBodyRow row={row} columns={columns} key={row[keyField]} />)
  ) : (
    <TableMessageContainer colSpan={columns.length - 1}>{noRowsContent}</TableMessageContainer>
  );

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
  row: rowPropType.isRequired,
  columns: columnsPropType.isRequired
};

const TableMessageContainer = ({ colSpan, children }) => (
  <tr>
    <td colSpan={colSpan}>
      <StyledMessageContainer>{children}</StyledMessageContainer>
    </td>
  </tr>
);

TableMessageContainer.propTypes = {
  colSpan: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

const LoadingContent = ({ colSpan }) => <TableMessageContainer colSpan={colSpan}>Loading...</TableMessageContainer>;

LoadingContent.propTypes = {
  colSpan: PropTypes.number.isRequired
};

const TableBody = ({ rows, columns, keyField, noRowsContent, loading }) => (
  <tbody>
    {!loading ? renderRows(rows, columns, keyField, noRowsContent) : <LoadingContent colSpan={columns.length - 1} />}
  </tbody>
);

TableBody.propTypes = {
  columns: columnsPropType.isRequired,
  rows: rowsPropType.isRequired,
  noRowsContent: PropTypes.string,
  keyField: PropTypes.string,
  loading: PropTypes.bool
};
TableBody.defaultProps = {
  noRowsContent: "No records have been created for this table.",
  keyField: "id",
  loading: false
};

export default TableBody;
