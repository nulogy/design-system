import React from "react";
import styled from "styled-components";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import PropTypes from "prop-types";
import { columnsPropType, rowsPropType } from "./Table.types";

const StyledTable = styled.table<any>({
  borderCollapse: "collapse",
  width: "100%",
  background: "white",
  position: "relative",
});
type BaseTableProps = React.ComponentProps<"table"> & {
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
  onRowMouseEnter?: any;
  onRowMouseLeave?: any;
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
  stickyHeader,
  onRowMouseEnter,
  onRowMouseLeave,
  ...props
}) => (
  <StyledTable id={id} className={className} {...props}>
    <TableHead columns={columns} compact={compact} sticky={stickyHeader} />
    <TableBody
      columns={columns}
      rows={rows}
      keyField={keyField}
      noRowsContent={noRowsContent}
      loading={loading}
      rowHovers={rowHovers}
      compact={compact}
      onRowMouseLeave={onRowMouseLeave}
      onRowMouseEnter={onRowMouseEnter}
    />
    {footerRows && (
      <TableFoot
        columns={columns}
        rows={footerRows}
        keyField={keyField}
        loading={loading}
      />
    )}
  </StyledTable>
);

BaseTable.propTypes = {
  columns: columnsPropType,
  rows: rowsPropType,
  noRowsContent: PropTypes.string,
  keyField: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  footerRows: rowsPropType,
  rowHovers: PropTypes.bool,
  compact: PropTypes.bool,
  className: PropTypes.string,
  stickyHeader: PropTypes.bool,
  onRowMouseEnter: PropTypes.func,
  onRowMouseLeave: PropTypes.func,
};

BaseTable.defaultProps = {
  noRowsContent: "No records have been created for this table.",
  keyField: "id",
  id: undefined,
  loading: false,
  footerRows: [],
  rowHovers: true,
  compact: false,
  className: undefined,
  stickyHeader: false,
  onRowMouseEnter: () => {},
  onRowMouseLeave: () => {},
};
export default BaseTable;
