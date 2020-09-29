import React from "react";
import styled from "styled-components";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
const StyledTable = styled.table({
  borderCollapse: "collapse",
  width: "100%",
  background: "white",
  position: "relative"
});
type BaseTableProps = {
  columns: any;
  rows: any;
  noRowsContent?: string;
  keyField?: string;
  id?: string;
  loading?: boolean;
  footerRows?: any;
  rowHovers?: boolean;
  compact?: boolean;
  className?: string;
  stickyHeader?: boolean;
};
const BaseTable: React.SFC<BaseTableProps> = ({
  columns,
  rows,
  noRowsContent,
  keyField,
  id,
  loading,
  footerRows,
  rowHovers,
  compact,
  className,
  stickyHeader
}) => (
  <StyledTable id={id} className={className}>
    <TableHead columns={columns} compact={compact} sticky={stickyHeader} />
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
BaseTable.defaultProps = {
  noRowsContent: "No records have been created for this table.",
  keyField: "id",
  id: undefined,
  loading: false,
  footerRows: [],
  rowHovers: true,
  compact: false,
  className: undefined,
  stickyHeader: false
};
export default BaseTable;
