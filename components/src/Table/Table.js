import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import theme from "../theme";

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
  "tbody td": {
    textAlign: "left",
    padding: "15px 0",
    paddingRight: "16px",
    "&:first-of-type": {
      paddingLeft: "16px"
    }
  }
});

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
      {rows.map(row => (
        <tr>
          {columns.map(({ dataKey }) => (
            <td>{row[dataKey]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </StyledTable>
);
Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      dataKey: PropTypes.string.isRequired
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  noRowsContent: PropTypes.string
};

Table.defaultProps = {
  noRowsContent: "No records have been created for this table."
};

export default Table;
