import styled from "styled-components";
import { DefaultNDSThemeType } from "../theme";

const getHoverBackground = (currentPage: boolean, disabled: boolean, theme: DefaultNDSThemeType) => {
  if (currentPage) {
    return theme.colors.darkBlue;
  }
  if (disabled) {
    return "initial";
  }
  return theme.colors.lightGrey;
};

const PaginationButton = styled.button<{ disabled?: boolean; currentPage?: boolean }>(
  ({ theme, disabled, currentPage }) => ({
    fontSize: theme.fontSizes.small,
    padding: `${theme.space.x1} ${theme.space.x2}`,
    lineHeight: theme.lineHeights.smallTextBase,
    display: "flex",
    borderRadius: theme.radii.medium,
    border: `1px solid ${currentPage ? theme.colors.darkBlue : theme.colors.lightGrey}`,
    color: disabled ? theme.colors.grey : theme.colors.black,
    "&:not(:last-child)": {
      marginRight: theme.space.x2,
    },
    cursor: disabled ? "default" : "pointer",
    "&:hover": {
      background: getHoverBackground(currentPage, disabled, theme),
    },
  })
);

export default PaginationButton;
