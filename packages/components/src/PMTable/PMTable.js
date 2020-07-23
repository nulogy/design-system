import React from "react";

import { Link } from "../Link";
import { Table } from "../Table";
import { PMPaginationCss } from "../PMPagination/PMPagination";

/* Temporary Pack Manager (PM) legacy styled version of the component */

const PMCss = {
  fontSize: "12px",
  ".nds-table__no-rows-content": {
    padding: 0,
    fontSize: "12px"
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
  ".table-row--odd": {
    backgroundColor: "#f0f0f0"
  },

  ".table-row--odd + [data-testid='expanded-table-row']": {
    backgroundColor: "#f0f0f0"
  },
  "tbody td, tfoot td": {
    padding: 0,
    height: "34px",
    color: "#444"
  },
  "tr[data-testid='expanded-table-row'] > td:first-child": {
    paddingLeft: 0
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
  },
  "button[class*='ControlIcon']": {
    transform: "scale(0.7)"
  }
};

const markRowsEvenOdd = rows => {
  return rows.map((row, index) => {
    const evenOddClassName = (index + 1) % 2 === 0 ? "table-row--even" : "table-row--odd";
    return {
      ...row,
      rowClassName: evenOddClassName
    };
  });
};

// eslint-disable-next-line react/prop-types
const PMTable = ({ rows, ...props }) => (
  <Table css={PMCss} rowHovers={false} paginationCss={PMPaginationCss} rows={markRowsEvenOdd(rows)} {...props} />
);

export default PMTable;
