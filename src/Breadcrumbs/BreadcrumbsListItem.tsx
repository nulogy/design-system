import styled, { CSSObject } from "styled-components";
import { space, color, flexbox, layout } from "styled-system";
import { ComponentSize } from "../Input/InputField";
import { DefaultNDSThemeType } from "../theme.type";

const getSize = (size: ComponentSize, theme: DefaultNDSThemeType): CSSObject => {
  switch (size) {
    case "large":
      return {
        "a, p": {
          padding: `${theme.space.x2} ${theme.space.x1}`,
          fontSize: theme.fontSizes.medium,
        },
      };

    case "medium":
    default:
      return {
        padding: `${theme.space.x2} ${theme.space.x1}`,
        "a, p": {
          fontSize: theme.fontSizes.small,
        },
      };
  }
};

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

export const BreadcrumbsListItem = styled.li<{ size: ComponentSize }>(
  ({ theme }) => ({
    margin: 0,
    padding: `${theme.space.x2} ${theme.space.x1}`,
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
  ({ size, theme }) => getSize(size, theme),
  space,
  layout,
  color,
  flexbox
);
