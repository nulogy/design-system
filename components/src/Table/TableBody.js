import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import { Box } from "../Box";
import { rowsPropType, columnsPropType, rowPropType } from "./Table.types";
import TableCell from "./TableCell";

const StyledMessageContainer = styled(Box)({
  padding: `${theme.space.x3} 0`,
  fontSize: theme.fontSizes.small,
  color: theme.colors.darkGrey
});

const StyledTr = styled.tr({
  "&:hover": {
    backgroundColor: theme.colors.whiteGrey
  }
});

const renderRows = (rows, columns, keyField, noRowsContent) =>
  rows.length > 0 ? (
    rows.map(row => <TableBodyRow row={row} columns={columns} key={row[keyField]} keyField={keyField} />)
  ) : (
    <TableMessageContainer colSpan={columns.length - 1}>{noRowsContent}</TableMessageContainer>
  );

const TableBodyRow = ({ row, columns }) => {
  const renderAllCells = () =>
    columns.map(column => <TableCell key={column.dataKey} row={row} column={column} cellData={row[column.dataKey]} />);
  return (
    <>
      <StyledTr>
        {row.heading ? <TableCell row={row} colSpan={columns.length} cellData={row.heading} /> : renderAllCells()}
      </StyledTr>
      {row.expandedContent && row.expanded && (
        <tr>
          <td colSpan={columns.length}>{row.expandedContent()}</td>
        </tr>
      )}
    </>
  );
};

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
