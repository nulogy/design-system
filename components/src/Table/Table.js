import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import TableHead from "./TableHead";
import TableBody from "./TableBody";
import WithSelectableColumn from "./WithSelectableColumn";

const StyledTable = styled.table({
  borderCollapse: "collapse",
  width: "100%"
});

const BaseTable = ({ columns, rows, noRowsContent, keyField }) => (
  <StyledTable>
    <TableHead columns={columns} />
    <TableBody columns={columns} rows={rows} keyField={keyField} noRowsContent={noRowsContent} />
  </StyledTable>
);

const Table = props => (props.hasSelectableRows ? WithSelectableColumn(BaseTable)(props) : BaseTable(props));

BaseTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      align: PropTypes.oneOf(["right", "left", "center"]),
      label: PropTypes.string,
      dataKey: PropTypes.string.isRequired,
      cellFormatter: PropTypes.func,
      cellRenderer: PropTypes.func,
      headerRenderer: PropTypes.func
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])))
    .isRequired,
  noRowsContent: PropTypes.string,
  keyField: PropTypes.string
};
BaseTable.defaultProps = {
  noRowsContent: "No records have been created for this table.",
  keyField: "id"
};
Table.propTypes = {
  ...BaseTable.propTypes,
  hasSelectableRows: PropTypes.bool,
  onSelectHeader: PropTypes.func,
  onSelectRow: PropTypes.func,
  selectedRows: PropTypes.arrayOf(PropTypes.string)
};

Table.defaultProps = {
  ...BaseTable.defaultProps,
  hasSelectableRows: false,
  selectedRows: []
};

export default Table;
