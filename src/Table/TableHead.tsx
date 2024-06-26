import React from "react";
import styled from "styled-components";
import StyledTh from "./StyledTh";
import type { ColumnType, Columns } from "./Table.types";

interface TableHeadProps<ColumnMetadata> {
  columns: Columns<ColumnMetadata>;
  compact?: boolean;
  sticky?: boolean;
}

const StyledHeaderRow = styled.tr(({ theme }) => ({
  color: theme.colors.darkGrey,
  borderBottom: `1px solid ${theme.colors.lightGrey}`,
}));

function renderHeaderCellContent<ColumnMetadata>({
  headerFormatter = ({ label }) => label,
  align,
  label,
  width,
  metadata,
  dataKey,
  key,
}: ColumnType<ColumnMetadata>) {
  return key
    ? headerFormatter({ align, label, width, metadata, key })
    : headerFormatter({ align, label, width, metadata, dataKey });
}

function TableHead<ColumnMetadata>({ columns, compact, sticky }: TableHeadProps<ColumnMetadata>) {
  const renderColumns = (allColumns: Columns<ColumnMetadata>) =>
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
}

export default TableHead;
