import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";

const StyledTable = styled.table({
  borderCollapse: "collapse",
  width: "100%"
});

const BaseTable = ({ columns, rows, noRowsContent, keyField, id, loading, footerRows }) => (
  <StyledTable id={id}>
    <TableHead columns={columns} />
    <TableBody columns={columns} rows={rows} keyField={keyField} noRowsContent={noRowsContent} loading={loading} />
    {footerRows && <TableFoot columns={columns} />}
  </StyledTable>
);

BaseTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      align: PropTypes.oneOf(["right", "left", "center"]),
      label: PropTypes.string,
      dataKey: PropTypes.string.isRequired,
      cellFormatter: PropTypes.func,
      cellRenderer: PropTypes.func,
      headerRenderer: PropTypes.func,
      width: PropTypes.string
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])))
    .isRequired,
  noRowsContent: PropTypes.string,
  keyField: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  footerRows: PropTypes.bool
};

BaseTable.defaultProps = {
  noRowsContent: "No records have been created for this table.",
  keyField: "id",
  id: undefined,
  loading: false
};

export default BaseTable;
