import React from "react";

import { Pagination } from "../Pagination";

/* Temporary Pack Manager (PM) legacy styled version of the component */

export const PMPaginationCss = {
  justifyContent: "flex-start",
  button: {
    fontSize: "12px",
    padding: "0 4px",
    minWidth: "22px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "3px",
    "&:not([disabled])": {
      color: "#3593d8"
    },
    "&:not(:last-child)": {
      marginRight: "6px"
    },
    "&[aria-current=true]": {
      backgroundColor: "#2E5C87",
      fontWeight: "bold"
    },
    svg: {
      display: "none"
    }
  }
};

const PMPagination = props => <Pagination css={PMPaginationCss} {...props} />;

export default PMPagination;
