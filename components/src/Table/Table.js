import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import theme from "../theme";
import { Box } from "../Box";

import withSelectable from "./withSelectable";

const StyledTable = styled.table({
  borderCollapse: "collapse",
  width: "100%",
  "thead tr": {
    color: theme.colors.darkGrey,
    borderBottom: `1px solid ${theme.colors.lightGrey}`
  },
  td: {
    paddingRight: "16px",
    "&:first-of-type": {
      paddingLeft: "16px"
    }
  },
  ".table-cell--alignRight": {
    textAlign: "right"
  }
});

const NoRowsContainer = styled(Box)({
  padding: `${theme.space.x3} 0`,
  fontSize: theme.fontSizes.small,
  color: theme.colors.darkGrey
});

const StyledTextCell = styled.div({
  paddingTop: "15px",
  paddingBottom: "15px"
});

const StyledTh = styled.th({
  fontWeight: "normal",
  textAlign: "left",
  padding: "15px 0",
  paddingRight: "16px",
  "&:first-of-type": {
    paddingLeft: "16px"
  }
});

const TextCell = ({ children, align }) => (
  <StyledTextCell className={align === "right" ? "table-cell--alignRight" : null}>{children}</StyledTextCell>
);

TextCell.propTypes = {
  children: PropTypes.string,
  align: PropTypes.string
};

TextCell.defaultProps = {
  children: "",
  align: undefined
};

const textCellRenderer = (cellData, { cellFormatter, align }) => (
  <TextCell align={align}>{cellFormatter ? cellFormatter(cellData) : cellData}</TextCell>
);

const renderCellContent = (row, { cellRenderer, dataKey, ...columnOptions }) => {
  const renderer = cellRenderer || textCellRenderer;

  return renderer(row[dataKey], columnOptions, row);
};

const renderRows = (rows, columns, keyField) =>
  rows.map(row => (
    <tr key={row[keyField]}>
      {columns.map(column => (
        <td key={column.dataKey}>{renderCellContent(row, column)}</td>
      ))}
    </tr>
  ));

const defaultHeaderRenderer = ({ label }) => label;
const renderHeaderCellContent = ({ headerRenderer = defaultHeaderRenderer, ...column }) => headerRenderer(column);

const renderColumns = columns =>
  columns.map(column => <StyledTh key={column.label}>{renderHeaderCellContent(column)}</StyledTh>);

const BaseTable = ({ columns, rows, noRowsContent, keyField }) => (
  <StyledTable>
    <thead>
      <tr>{renderColumns(columns)}</tr>
    </thead>
    <tbody>
      {rows.length > 0 ? (
        renderRows(rows, columns, keyField)
      ) : (
        <tr>
          <td colSpan={columns.length - 1}>
            <NoRowsContainer>{noRowsContent}</NoRowsContainer>
          </td>
        </tr>
      )}
    </tbody>
  </StyledTable>
);

const Table = props => (props.hasSelectableRows ? withSelectable(BaseTable)(props) : BaseTable(props));

BaseTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      dataKey: PropTypes.string.isRequired,
      cellFormatter: PropTypes.func,
      cellRenderer: PropTypes.func,
      headerRenderer: PropTypes.func
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])))
    .isRequired,
  noRowsContent: PropTypes.string,
  keyField: PropTypes.string
};
BaseTable.defaultProps = {
  noRowsContent: "No records have been created for this table.",
  keyField: "id"
};
Table.propTypes = {
  ...BaseTable.propTypes,
  hasSelectableRows: PropTypes.bool,
  onSelectHeader: PropTypes.func,
  onSelectRow: PropTypes.func,
  selectedRows: PropTypes.arrayOf(PropTypes.string)
};

Table.defaultProps = {
  ...BaseTable.defaultProps,
  hasSelectableRows: false,
  selectedRows: []
};

export default Table;
