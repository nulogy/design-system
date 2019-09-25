import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Table as RVTable, Column as RVColumn, AutoSizer, WindowScroller } from "react-virtualized";

import theme from "../theme";
import { Box } from "../Box";

const StyledTable = styled(RVTable)({
  ".ReactVirtualized__Table": {},
  ".ReactVirtualized__Table__Grid": {},
  ".ReactVirtualized__Table__headerRow": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.colors.darkGrey,
    borderBottom: `1px solid ${theme.colors.lightGrey}`
  },
  ".ReactVirtualized__Table__row": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  ".ReactVirtualized__Table__row:hover": {
    backgroundColor: theme.colors.whiteGrey
  },
  ".ReactVirtualized__Table__headerTruncatedText": {
    display: "inline-block",
    maxWidth: "100%",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  ".ReactVirtualized__Table__headerColumn": {
    marginRight: theme.space.x2,
    minWidth: theme.space.x6,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  ".ReactVirtualized__Table__rowColumn": {
    marginRight: theme.space.x2,
    minWidth: theme.space.x6,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  ".ReactVirtualized__Table__rowColumn.rowColumn--alignRight": {
    textAlign: "right"
  },
  ".ReactVirtualized__Table__headerColumn:first-of-type": {
    marginLeft: theme.space.x2
  },
  ".ReactVirtualized__Table__rowColumn:first-of-type": {
    marginLeft: theme.space.x2
  },
  ".ReactVirtualized__Grid:focus": {
    outline: "none"
  }
});

const NoRowsContainer = styled(Box)({
  padding: `${theme.space.x3} 0`,
  fontSize: theme.fontSizes.small,
  color: theme.colors.darkGrey
});

const generateColumns = columns =>
  columns.map(({ label, dataKey, align, cellFormatter }) => (
    <RVColumn
      className={align === "right" ? "rowColumn--alignRight" : undefined}
      key={dataKey}
      label={label}
      dataKey={dataKey}
      width={100}
      flexGrow={1}
      flexShrink={1}
      cellDataGetter={cellFormatter}
    />
  ));

const rowGetter = rows => ({ index }) => rows[index];

const ROW_HEIGHT = 56;

const Table = ({ columns, rows, noRowsContent }) => (
  <WindowScroller>
    {({ height, isScrolling, onChildScroll, scrollTop }) => (
      <AutoSizer disableHeight>
        {({ width }) => (
          <StyledTable
            autoHeight
            width={width}
            height={height}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            scrollTop={scrollTop}
            rowHeight={ROW_HEIGHT}
            headerHeight={ROW_HEIGHT}
            rowGetter={rowGetter(rows)}
            rowCount={rows.length}
            noRowsRenderer={() => <NoRowsContainer>{noRowsContent}</NoRowsContainer>}
          >
            {generateColumns(columns)}
          </StyledTable>
        )}
      </AutoSizer>
    )}
  </WindowScroller>
);
Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      dataKey: PropTypes.string.isRequired
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  noRowsContent: PropTypes.string
};

Table.defaultProps = {
  noRowsContent: "No records have been created for this table."
};

export default Table;
