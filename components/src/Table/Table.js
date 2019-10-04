import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import theme from "../theme";
import { Box } from "../Box";

const StyledTable = styled.table({
  borderCollapse: "collapse",
  width: "100%",
  "thead tr": {
    color: theme.colors.darkGrey,
    borderBottom: `1px solid ${theme.colors.lightGrey}`
  },
  th: {
    fontWeight: "normal",
    textAlign: "left",
    padding: "15px 0",
    paddingRight: "16px",
    "&:first-of-type": {
      paddingLeft: "16px"
    }
  },
  td: {
    paddingRight: "16px",
    "&:first-of-type": {
      paddingLeft: "16px"
    }
  },
  ".table-cell--alignRight": {
    textAlign: "right"
  }
});

const NoRowsContainer = styled(Box)({
  padding: `${theme.space.x3} 0`,
  fontSize: theme.fontSizes.small,
  color: theme.colors.darkGrey
});

const StyledTextCell = styled.div({
  paddingTop: "15px",
  paddingBottom: "15px"
});

const TextCell = ({ children, align }) => (
  <StyledTextCell className={align === "right" ? "table-cell--alignRight" : null}>{children}</StyledTextCell>
);

const textCellRenderer = (cellData, { cellFormatter, align }) => (
  <TextCell align={align}>{cellFormatter ? cellFormatter(cellData) : cellData}</TextCell>
);

const renderCellContent = (row, { cellRenderer, dataKey, ...columnOptions }) => {
  const renderer = cellRenderer || textCellRenderer;

  return renderer(row[dataKey], columnOptions);
};

const renderRows = (rows, columns) =>
  rows.map(row => (
    <tr>
      {columns.map(column => (
        <td>{renderCellContent(row, column)}</td>
      ))}
    </tr>
  ));

const Table = ({ columns, rows, noRowsContent }) => (
  <StyledTable>
    <thead>
      <tr>
        {columns.map(({ label }) => (
          <th>{label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.length > 0 ? (
        renderRows(rows, columns)
      ) : (
        <tr>
          <td colSpan={columns.length - 1}>
            <NoRowsContainer>{noRowsContent}</NoRowsContainer>
          </td>
        </tr>
      )}
    </tbody>
  </StyledTable>
);
Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      dataKey: PropTypes.string.isRequired,
      cellFormatter: PropTypes.func
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  noRowsContent: PropTypes.string
};

Table.defaultProps = {
  noRowsContent: "No records have been created for this table."
};

export default Table;
