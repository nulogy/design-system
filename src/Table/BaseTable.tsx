import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import { rowsPropType, ColumnType, RowType } from "./Table.types";

export type BaseTableProps = {
  columns: ColumnType[];
  rows: RowType[];
  noRowsContent?: string;
  keyField?: string;
  id?: string;
  loading?: boolean;
  footerRows?: any;
  rowHovers?: boolean;
  compact?: boolean;
  className?: string;
  stickyHeader?: boolean;
  onRowMouseEnter?: (...args: any[]) => any;
  onRowMouseLeave?: (...args: any[]) => any;
  onMouseEnter?: any;
  onMouseLeave?: any;
};

const StyledTable = styled.table<any>(space, {
  borderCollapse: "collapse",
  width: "100%",
  background: "white",
  position: "relative",
});

const BaseTable: React.FC<BaseTableProps> = ({
  columns,
  rows,
  noRowsContent = "No records have been created for this table.",
  keyField = "id",
  id,
  loading,
  footerRows = [],
  rowHovers = true,
  compact,
  className,
  stickyHeader,
  onRowMouseEnter = () => {},
  onRowMouseLeave = () => {},
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
      <TableFoot columns={columns} rows={footerRows} keyField={keyField} loading={loading} compact={compact} />
    )}
  </StyledTable>
);

BaseTable.propTypes = {
  ...propTypes.space,
  columns: PropTypes.any,
  rows: PropTypes.any,
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
