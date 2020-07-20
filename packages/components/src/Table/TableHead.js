import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import StyledTh from "./StyledTh";

const StyledHeaderRow = styled.tr(({ theme }) => ({
  color: theme.colors.darkGrey,
  borderBottom: `1px solid ${theme.colors.lightGrey}`
}));

const defaultheaderFormatter = ({ label }) => label;

const renderHeaderCellContent = ({ headerFormatter = defaultheaderFormatter, ...column }) => headerFormatter(column);

const TableHead = ({ columns, compact }) => {
  const renderColumns = allColumns =>
    allColumns.map(column => (
      <StyledTh scope="col" key={column.dataKey} width={column.width} compact={compact} data-testid="table-head">
        {renderHeaderCellContent(column)}
      </StyledTh>
    ));
  return (
    <thead>
      <StyledHeaderRow>{renderColumns(columns)}</StyledHeaderRow>
    </thead>
  );
};

TableHead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      align: PropTypes.oneOf(["right", "left", "center"]),

      dataKey: PropTypes.string.isRequired,
      cellRenderer: PropTypes.func,
      cellFormatter: PropTypes.func,
      headerFormatter: PropTypes.func
    })
  ).isRequired,
  compact: PropTypes.bool.isRequired
};

export default TableHead;
