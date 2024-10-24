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
      fontSize: theme.fontSizes.medium,
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
    },
  }),
  variant({
    variants: {
      touch: {
        "a, p": {
          py: "x2",
          px: "x0",
          fontSize: "medium",
        },
      },
      desktop: {
        "a, p": {
          py: "0",
          px: "0",
          fontSize: "small",
        },
      },
    },
  }),
  space,
  layout,
  color,
  flexbox
);
