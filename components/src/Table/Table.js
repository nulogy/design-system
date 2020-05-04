import React from "react";

import StatefulTable from "./StatefulTable";
import BaseTable from "./BaseTable";
import SortingColumnHeader from "./SortingColumnHeader";
import theme from "../theme";
import { Link } from "../Link";

const PMCss = {
  fontFamily: `"Helvetica Neue", "Helvetica", "Arial", "sans-serif"`,
  fontSize: "12px",
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
  "tbody tr:nth-child(odd)": {
    backgroundColor: theme.colors.whiteGrey // #f0f0f0
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
