import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";

const StyledHeaderRow = styled.tr({
  color: theme.colors.darkGrey,
  borderBottom: `1px solid ${theme.colors.lightGrey}`
});

const StyledTh = styled.th({
  fontWeight: "normal",
  textAlign: "left",
  padding: `${theme.space.x2} 0`,
  paddingRight: theme.space.x2,
  "&:first-of-type": {
    paddingLeft: theme.space.x2
  }
});

const defaultHeaderRenderer = ({ label }) => label;

const renderHeaderCellContent = ({ headerRenderer = defaultHeaderRenderer, ...column }) => headerRenderer(column);

const renderColumns = columns =>
  columns.map(column => <StyledTh key={column.label}>{renderHeaderCellContent(column)}</StyledTh>);

const TableHead = ({ columns }) => (
  <thead>
    <StyledHeaderRow>{renderColumns(columns)}</StyledHeaderRow>
  </thead>
);

TableHead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      align: PropTypes.oneOf(["right", "left", "center"]),

      dataKey: PropTypes.string.isRequired,
      cellFormatter: PropTypes.func,
      cellRenderer: PropTypes.func,
      headerRenderer: PropTypes.func
    })
  ).isRequired
};

export default TableHead;
