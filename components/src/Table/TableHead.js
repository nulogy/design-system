import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";

const StyledHeaderRow = styled.tr({
  color: theme.colors.darkGrey,
  borderBottom: `1px solid ${theme.colors.lightGrey}`
});

const StyledTh = styled.th(({ width }) => ({
  fontWeight: "normal",
  textAlign: "left",
  padding: `${theme.space.x2} 0`,
  paddingRight: theme.space.x2,
  "&:first-of-type": {
    paddingLeft: theme.space.x2
  },
  width: width || "auto"
}));

const defaultheaderFormatter = ({ label }) => label;

const renderHeaderCellContent = ({ headerFormatter = defaultheaderFormatter, ...column }) => headerFormatter(column);

const renderColumns = columns =>
  columns.map(column => (
    <StyledTh scope="col" key={column.dataKey} width={column.width}>
      {renderHeaderCellContent(column)}
    </StyledTh>
  ));

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
      cellRenderer: PropTypes.func,
      cellFormatter: PropTypes.func,
      headerFormatter: PropTypes.func
    })
  ).isRequired
};

export default TableHead;
