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

const PaginationButton = styled.button<{
  disabled?: boolean;
  currentPage?: boolean;
  iconOnly?: boolean;
}>(({ theme, disabled, currentPage, iconOnly }) => ({
  fontSize: theme.fontSizes.small,
  padding: iconOnly ? theme.space.x1 : `${theme.space.x1} ${theme.space.x2}`,
  lineHeight: theme.lineHeights.smallTextBase,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.radii.medium,
  border: `1px solid ${currentPage ? theme.colors.darkBlue : theme.colors.lightGrey}`,
  color: disabled ? theme.colors.grey : theme.colors.black,
  minWidth: iconOnly ? theme.space.x4 : "auto",
  cursor: disabled ? "default" : "pointer",
  "&:hover": {
    background: getHoverBackground(currentPage, disabled, theme),
  },
}));

export default PaginationButton;
