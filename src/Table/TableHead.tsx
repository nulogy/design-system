import React from "react";
import styled from "styled-components";
import StyledTh from "./StyledTh";
import type { ColumnType, Columns } from "./Table.types";

interface TableHeadProps {
  columns: Columns;
  compact?: boolean;
  sticky?: boolean;
}

const StyledHeaderRow = styled.tr(({ theme }) => ({
  color: theme.colors.darkGrey,
  borderBottom: `1px solid ${theme.colors.lightGrey}`,
}));

const defaultheaderFormatter: ColumnType["headerFormatter"] = ({ label }) => label;

const renderHeaderCellContent = ({
  headerFormatter = defaultheaderFormatter,
  align,
  label,
  dataKey,
  width,
}: ColumnType) => headerFormatter({ align, label, dataKey, width });

const TableHead = ({ columns, compact, sticky }: TableHeadProps) => {
  const renderColumns = (allColumns: Columns) =>
    allColumns.map((column, index) => (
      <StyledTh
        scope="col"
        key={column.dataKey ?? column.key ?? index}
        width={column.width}
        compact={compact}
        data-testid="table-head"
        sticky={sticky}
      >
        {renderHeaderCellContent(column)}
      </StyledTh>
    ));
  return (
    <thead>
      <StyledHeaderRow>{renderColumns(columns)}</StyledHeaderRow>
    </thead>
  );
};

export default TableHead;
