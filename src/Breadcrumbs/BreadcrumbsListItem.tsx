import React from "react";
import styled from "styled-components";
import { space, color, flexbox, layout } from "styled-system";

const BreadcrumbsListItem: React.FC<any> = styled.li(
  ({ theme }) => ({
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "inline-flex",
    alignSelf: "center",
    color: theme.colors.darkGrey,
    "a:visited": {
      color: theme.colors.darkBlue,
    },
  }),
  space,
  layout,
  color,
  flexbox
);

export default BreadcrumbsListItem;
