import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import { columnsPropType, rowsPropType } from "./Table.types";

const StyledTable = styled.table({
  borderCollapse: "collapse",
  width: "100%",
  background: "white"
});

const BaseTable = ({
  columns,
  rows,
  noRowsContent,
  keyField,
  id,
  loading,
  footerRows,
  rowHovers,
  compact,
  className
}) => (
  <StyledTable id={id} className={className}>
    <TableHead columns={columns} compact={compact} />
    <TableBody
      columns={columns}
      rows={rows}
      keyField={keyField}
      noRowsContent={noRowsContent}
      loading={loading}
      rowHovers={rowHovers}
      compact={compact}
    />
    {footerRows && <TableFoot columns={columns} rows={footerRows} keyField={keyField} loading={loading} />}
  </StyledTable>
);

BaseTable.propTypes = {
  columns: columnsPropType.isRequired,
  rows: rowsPropType.isRequired,
  noRowsContent: PropTypes.string,
  keyField: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  footerRows: rowsPropType,
  rowHovers: PropTypes.bool,
  compact: PropTypes.bool,
  className: PropTypes.string
};

BaseTable.defaultProps = {
  noRowsContent: "No records have been created for this table.",
  keyField: "id",
  id: undefined,
  loading: false,
  footerRows: [],
  rowHovers: true,
  compact: false,
  className: undefined
};

export default BaseTable;
