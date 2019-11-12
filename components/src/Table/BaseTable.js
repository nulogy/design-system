import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import { columnsPropType, rowsPropType } from "./Table.types";
import withExpandableColumn from "./withExpandableColumn";

const StyledTable = styled.table({
  borderCollapse: "collapse",
  width: "100%"
});

const BaseTable = ({ hasExpandableRows, ...props }) => {
  const TableComponent = ({ columns, rows, noRowsContent, keyField, id, loading, footerRows }) => {
    return (
      <StyledTable id={id}>
        <TableHead columns={columns} />
        <TableBody columns={columns} rows={rows} keyField={keyField} noRowsContent={noRowsContent} loading={loading} />
        {footerRows && <TableFoot columns={columns} rows={footerRows} loading={loading} />}
      </StyledTable>
    );
  };
  return hasExpandableRows ? withExpandableColumn(TableComponent)(props) : <TableComponent {...props} />;
};

BaseTable.propTypes = {
  columns: columnsPropType.isRequired,
  rows: rowsPropType.isRequired,
  noRowsContent: PropTypes.string,
  keyField: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  footerRows: rowsPropType,
  hasExpandableRows: PropTypes.bool
};

BaseTable.defaultProps = {
  noRowsContent: "No records have been created for this table.",
  keyField: "id",
  id: undefined,
  loading: false,
  footerRows: [],
  hasExpandableRows: false
};

export default BaseTable;
