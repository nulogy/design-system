import React from "react";
import styled from "styled-components";
import { addStyledProps } from "../StyledProps";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import { ColumnType } from "./Table.types";

export type BaseTableProps<Row extends unknown> = {
  columns: ColumnType<Row>[];
  rows: Row[];
  noRowsContent?: string;
  keyField?: string;
  id?: string;
  loading?: boolean;
  footerRows?: Row[];
  rowHovers?: boolean;
  compact?: boolean;
  className?: string;
  stickyHeader?: boolean;
  onRowMouseEnter?: React.DOMAttributes<HTMLTableRowElement>["onMouseEnter"];
  onRowMouseLeave?: React.DOMAttributes<HTMLTableRowElement>["onMouseLeave"];
  onMouseEnter?: React.DOMAttributes<HTMLTableElement>["onMouseEnter"];
  onMouseLeave?: React.DOMAttributes<HTMLTableElement>["onMouseLeave"];
};

const StyledTable = styled.table(
  {
    borderCollapse: "collapse",
    width: "100%",
    background: "white",
    position: "relative",
  },
  addStyledProps
);

export default function BaseTable<Row>({
  columns,
  rows,
  noRowsContent = "No records have been created for this table.",
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
}: BaseTableProps<Row>) {
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

const noop = () => {};

BaseTable.defaultProps = {
  noRowsContent: "No records have been created for this table.",
  keyField: "id",
  loading: false,
  footerRows: [],
  rowHovers: true,
  compact: false,
  stickyHeader: false,
  onRowMouseEnter: noop,
  onRowMouseLeave: noop,
};
