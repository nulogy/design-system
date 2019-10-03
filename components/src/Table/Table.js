import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import theme from "../theme";

const Table = ({ columns, rows, noRowsContent }) => (
  <table>
    <tr>
      {columns.map(({ label }) => (
        <th>{label}</th>
      ))}
    </tr>
    {rows.map(row => (
      <tr>
        {columns.map(({ dataKey }) => (
          <td>{row[dataKey]}</td>
        ))}
      </tr>
    ))}
  </table>
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
