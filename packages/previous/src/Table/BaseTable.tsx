import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import { RowType, Columns } from "./Table.types";

export type BaseTableProps<ColumnMetaData> = {
  columns: Columns<ColumnMetaData>;
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

function BaseTable<ColumnMetaData>({
  noRowsContent = "No records have been created for this table.",
  keyField = "id",
  loading = false,
  footerRows = [],
  rowHovers = true,
  compact = false,
  stickyHeader = false,
  onRowMouseEnter = () => {},
  onRowMouseLeave = () => {},
  columns,
  rows,
  id,
  className,
  ...props
}: BaseTableProps<ColumnMetaData>) {
  return (
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
}

export default BaseTable;
