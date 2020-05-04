import React from "react";

import StatefulTable from "./StatefulTable";
import BaseTable from "./BaseTable";
import SortingColumnHeader from "./SortingColumnHeader";
import { Link } from "../Link";

const PMCss = {
  fontFamily: `"Helvetica Neue", "Helvetica", "Arial", "sans-serif"`,
  fontSize: "12px",
  ".nds-table__no-rows-content": {
    padding: 0,
    fontSize: "12px",
    color: "#aaa"
  },
  "thead tr": {
    borderBottom: "none"
  },
  "thead th, tfoot th, tfoot td": {
    fontWeight: "bold",
    color: "#222",
    height: "34px",
    paddingTop: 0,
    paddingBottom: 0
  },
  "thead th, tfoot th, tbody td": {
    "&:first-child": {
      paddingLeft: "8px"
    }
  },
  "tbody tr:nth-child(odd)": {
    backgroundColor: "#f0f0f0"
  },

  "tbody td, tfoot td": {
    padding: 0,
    height: "34px",
    color: "#444"
  },
  [`${Link}`]: {
    fontSize: "12px",
    color: "#3593d8",
    textDecoration: "none",
    "&:visited": {
      color: "#660099"
    },
    "&:hover": {
      textDecoration: "underline"
    }
  }
};
const Table = props => {
  const { hasSelectableRows, rowsPerPage, hasExpandableRows, packManagerStyle } = props;

  return hasSelectableRows || rowsPerPage || hasExpandableRows ? (
    <StatefulTable {...props} css={packManagerStyle && PMCss} rowHovers={packManagerStyle && false} />
  ) : (
    <BaseTable {...props} css={packManagerStyle && PMCss} rowHovers={packManagerStyle && false} />
  );
};

Table.SortingHeader = SortingColumnHeader;

Table.propTypes = {
  ...BaseTable.propTypes,
  ...StatefulTable.propTypes
};

Table.defaultProps = {
  ...BaseTable.defaultProps,
  ...StatefulTable.defaultProps
};

export default Table;
