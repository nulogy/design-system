import React from "react";
import styled from "styled-components";
import { Box } from "../Box";
import { DefaultNDSThemeType } from "../theme";
import TableCell from "./TableCell";
import { RowBorder } from "./Table.types";

const StyledMessageContainer = styled(Box)(({ theme }) => ({
  padding: `${theme.space.x3} 0`,
  fontSize: theme.fontSizes.small,
  color: theme.colors.darkGrey,
}));

type StyledTrProps = React.ComponentProps<"tr"> & {
  rowHovers?: boolean;
  rowBorder?: RowBorder;
  theme?: DefaultNDSThemeType;
  className?: string;
};

const StyledTr = styled.tr<StyledTrProps>(({ rowHovers, rowBorder, theme }: StyledTrProps) => ({
  "&:hover": {
    backgroundColor: rowHovers ? theme.colors.whiteGrey : null,
  },
  ...(rowBorder && {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.colors.lightGrey,
    borderCollapse: "collapse",
  }),
}));

const renderRows = (
  rows,
  columns,
  keyField,
  noRowsContent,
  rowHovers,
  compact,
  onRowMouseLeave,
  onRowMouseEnter,
  rowBorder
) =>
  rows.length > 0 ? (
    rows.map((row, rowIndex) => {
      const rowKey = row[keyField] !== undefined ? row[keyField] : rowIndex;

      return (
        <TableBodyRow
          key={rowKey}
          row={row}
          columns={columns}
          keyField={keyField}
          rowHovers={rowHovers}
          compact={compact}
          rowClassName={row.rowClassName}
          onMouseEnter={(e) => onRowMouseEnter({ row, e })}
          onMouseLeave={(e) => onRowMouseLeave({ row, e })}
          rowBorder={rowBorder}
        />
      );
    })
  ) : (
    <TableMessageContainer colSpan={columns.length}>{noRowsContent}</TableMessageContainer>
  );

type TableBodyRowProps = {
  row: any;
  columns: any[];
  rowHovers?: boolean;
  compact?: boolean;
  rowClassName?: string;
  keyField?: string;
  onMouseEnter?: any;
  onMouseLeave?: any;
  rowBorder?: RowBorder;
};

const TableBodyRow = ({
  row,
  columns,
  rowHovers,
  compact,
  rowClassName,
  onMouseLeave,
  onMouseEnter,
  rowBorder,
}: TableBodyRowProps) => {
  const renderAllCells = () =>
    columns.map((column, index) => (
      <TableCell
        key={column.dataKey ?? column.key ?? index}
        row={row}
        column={column}
        cellData={row[column.dataKey]}
        compact={compact}
      />
    ));
  return (
    <>
      <StyledTr
        rowHovers={rowHovers}
        data-testid="table-row"
        className={rowClassName}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        rowBorder={rowBorder}
      >
        {row.heading ? (
          <TableCell row={row} colSpan={columns.length} cellData={row.heading} compact={compact} />
        ) : (
          renderAllCells()
        )}
      </StyledTr>
      {row.expandedContent && row.expanded && (
        <tr data-testid="expanded-table-row">
          <td colSpan={columns.length}>{row.expandedContent({ row })}</td>
        </tr>
      )}
    </>
  );
};

const TableMessageContainer = ({ colSpan, children }: { colSpan: number; children: React.ReactNode }) => (
  <tr data-testid="table-message-container">
    <td colSpan={colSpan}>
      <StyledMessageContainer className="nds-table__no-rows-content">{children}</StyledMessageContainer>
    </td>
  </tr>
);

const LoadingContent = ({ colSpan }: { colSpan: number }) => (
  <TableMessageContainer colSpan={colSpan}>Loading...</TableMessageContainer>
);

type TableBodyProps = {
  rows: any[];
  columns: any[];
  keyField?: string;
  noRowsContent?: any;
  loading?: boolean;
  rowHovers?: boolean;
  compact?: boolean;
  onRowMouseLeave?: any;
  onRowMouseEnter?: any;
  rowBorder?: RowBorder;
};

const TableBody = ({
  rows,
  columns,
  keyField = "id",
  noRowsContent = "No records have been created for this table.",
  loading,
  rowHovers,
  compact,
  onRowMouseLeave,
  onRowMouseEnter,
  rowBorder,
}: TableBodyProps) => (
  <tbody data-testid="table-body">
    {!loading ? (
      renderRows(
        rows,
        columns,
        keyField,
        noRowsContent,
        rowHovers,
        compact,
        onRowMouseLeave,
        onRowMouseEnter,
        rowBorder
      )
    ) : (
      <LoadingContent colSpan={columns.length} />
    )}
  </tbody>
);

export default TableBody;
