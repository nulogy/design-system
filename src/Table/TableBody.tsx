import React from "react";
import styled from "styled-components";
import { Box } from "../Box";
import { DefaultNDSThemeType } from "../theme.type";
import TableCell from "./TableCell";

const StyledMessageContainer = styled(Box)(({ theme }) => ({
  padding: `${theme.space.x3} 0`,
  fontSize: theme.fontSizes.small,
  color: theme.colors.darkGrey,
}));

type StyledTrProps = React.ComponentProps<"tr"> & {
  rowHovers?: boolean;
  theme?: DefaultNDSThemeType;
  className?: string;
};

const StyledTr: React.FC<StyledTrProps> = styled.tr(({ rowHovers, theme }: StyledTrProps) => ({
  "&:hover": {
    backgroundColor: rowHovers ? theme.colors.whiteGrey : null,
  },
}));

const renderRows = (rows, columns, keyField, noRowsContent, rowHovers, compact, onRowMouseLeave, onRowMouseEnter) =>
  rows.length > 0 ? (
    rows.map((row) => (
      <TableBodyRow
        row={row}
        columns={columns}
        key={row[keyField]}
        keyField={keyField}
        rowHovers={rowHovers}
        compact={compact}
        rowClassName={row.rowClassName}
        onMouseEnter={(e) => onRowMouseEnter({ row, e })}
        onMouseLeave={(e) => onRowMouseLeave({ row, e })}
      />
    ))
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
};

const TableBodyRow = ({
  row,
  columns,
  rowHovers,
  compact,
  rowClassName,
  onMouseLeave,
  onMouseEnter,
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

TableBodyRow.defaultProps = {
  rowClassName: undefined,
};

const TableMessageContainer = ({ colSpan, children }) => (
  <tr data-testid="table-message-container">
    <td colSpan={colSpan}>
      <StyledMessageContainer className="nds-table__no-rows-content">{children}</StyledMessageContainer>
    </td>
  </tr>
);

const LoadingContent = ({ colSpan }) => <TableMessageContainer colSpan={colSpan}>Loading...</TableMessageContainer>;

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
}: TableBodyProps) => (
  <tbody data-testid="table-body">
    {!loading ? (
      renderRows(rows, columns, keyField, noRowsContent, rowHovers, compact, onRowMouseLeave, onRowMouseEnter)
    ) : (
      <LoadingContent colSpan={columns.length} />
    )}
  </tbody>
);

export default TableBody;
