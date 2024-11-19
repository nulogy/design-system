import styled from "styled-components";
import { space, color, flexbox, layout, variant } from "styled-system";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";

export const BreadcrumbsListSeparator = styled.li(
  ({ theme }) => ({
    margin: 0,
    listStyle: "none",
    display: "inline-flex",
    alignSelf: "center",
    color: theme.colors.midGrey,
    "a, p": {
      fontSize: theme.fontSizes.base,
    },
    "a:visited": {
      color: theme.colors.darkBlue,
    },
  }),
  space,
  layout,
  color,
  flexbox
);

export const BreadcrumbsListItem = styled.li<{ variant: ComponentVariant }>(
  ({ theme }) => ({
    margin: 0,
    listStyle: "none",
    display: "inline-flex",
    alignSelf: "center",
    color: theme.colors.midGrey,
    a: {
      color: theme.colors.darkBlue,
      textDecorationLine: "none",
    },
    "a:visited": {
      color: theme.colors.darkBlue,
    },
    "a, p": {
      padding: theme.space.none,
      fontSize: theme.fontSizes.small,
      lineHeight: theme.lineHeights.smallTextBase,
    },
  }),
  space,
  layout,
  color,
  flexbox
);
