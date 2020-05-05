import React from "react";

import { Pagination } from "../Pagination";

/* Temporary Pack Manager (PM) legacy styled version of the component */

const PMCss = {
  button: {
    fontSize: "12px",
    fontFamily: `"Helvetica Neue", "Helvetica", "Arial", "sans-serif"`,
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
    }
  }
};

export const PMPagination = props => <Pagination css={PMCss} {...props} />;
