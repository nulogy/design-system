import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Table as RVTable, Column as RVColumn } from "react-virtualized";

import { theme } from "..";

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
  ".ReactVirtualized__Table__headerTruncatedText": {
    display: "inline-block",
    maxWidth: "100%",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  ".ReactVirtualized__Table__headerColumn": {
    marginRight: `${theme.space.x2}`,
    minWidth: `${theme.space.x6}`,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  ".ReactVirtualized__Table__rowColumn": {
    marginRight: `${theme.space.x2}`,
    minWidth: `${theme.space.x6}`,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  ".ReactVirtualized__Table__headerColumn:first-of-type": {},
  ".ReactVirtualized__Table__rowColumn:first-of-type": {}
});

const generateColumns = columns =>
  columns.map(({ label, dataKey }, index) => <RVColumn key={index} label={label} dataKey={dataKey} width={100} />);

const rowGetter = rows => ({ index }) => rows[index];

const Table = ({ columns, rows }) => (
  <StyledTable
    width={500}
    height={500}
    rowHeight={56}
    headerHeight={56}
    rowGetter={rowGetter(rows)}
    rowCount={rows.length}
  >
    {generateColumns(columns)}
  </StyledTable>
);
Table.propTypes = {};

Table.defaultProps = {};

export default Table;
