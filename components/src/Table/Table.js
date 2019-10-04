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
  "thead th": {
    fontWeight: "normal",
    textAlign: "left",
    padding: "15px 0",
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

const StyledTableCell = styled.td({
  textAlign: "left",
  padding: "15px 0",
  paddingRight: "16px",
  "&:first-of-type": {
    paddingLeft: "16px"
  }
});
const TableCell = ({ children, align }) => (
  <StyledTableCell className={align === "right" ? "table-cell--alignRight" : null}>{children}</StyledTableCell>
);

const formatData = (data, formatter) => (formatter ? formatter(data) : data);

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
        rows.map(row => (
          <tr>
            {columns.map(({ dataKey, align, cellFormatter }) => (
              <TableCell align={align}>{formatData(row[dataKey], cellFormatter)}</TableCell>
            ))}
          </tr>
        ))
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
