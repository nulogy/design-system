import React from "react";

import { Link } from "../Link";
import { Table } from "../Table";
import { PMPaginationCss } from "../PMPagination/PMPagination";

/* Temporary Pack Manager (PM) legacy styled version of the component */

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
  nav: {
    backgroundColor: "#660099"
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

export const PMTable = props => <Table css={PMCss} rowHovers={false} paginationCss={PMPaginationCss} {...props} />;
