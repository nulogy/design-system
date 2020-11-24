// @ts-nocheck
import React from "react";
import styled from "styled-components";
import StyledTh from "./StyledTh";
import { ColumnType } from './Table.types';

type TableHeadProps = {
  columns: ColumnType[],
  compact?: boolean,
  sticky?: boolean,
};

const StyledHeaderRow = styled.tr(({ theme }) => ({
  color: theme.colors.darkGrey,
  borderBottom: `1px solid ${theme.colors.lightGrey}`,
}));

const defaultheaderFormatter = ({ label }) => label;
const renderHeaderCellContent = ({
  headerFormatter = defaultheaderFormatter,
  ...column
}) => headerFormatter(column);

const TableHead: React.SFC<TableHeadProps> = ({ columns, compact, sticky }) => {
  const renderColumns = (allColumns) =>
    allColumns.map((column) => (
      <StyledTh
        scope="col"
        key={column.dataKey}
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
TableHead.defaultProps = {
  sticky: false,
};
export default TableHead;
