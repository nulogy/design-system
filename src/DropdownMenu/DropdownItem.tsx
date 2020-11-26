import styled, { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
type DropdownItemProps = {
  theme?: DefaultNDSThemeType;
  color?: string;
  hoverColor?: string;
  bgHoverColor?: string;
};
const DropdownItem: React.SFC<DropdownItemProps> = styled.div(
  ({
    theme,
    color = "darkBlue",
    hoverColor = "darkBlue",
    bgHoverColor = "lightGrey",
  }: DropdownItemProps): CSSObject => ({
    "*": {
      color: theme.colors[color],
      display: "block",
      width: "100%",
      cursor: "pointer",
      border: "none",
      textAlign: "left",
      backgroundColor: "transparent",
      lineHeight: theme.lineHeights.base,
      transition: ".2s",
      fontSize: `${theme.fontSizes.medium}`,
      padding: `${theme.space.x1} ${theme.space.x2}`,
      "&:hover, &:focus": {
        outline: "none",
        color: theme.colors[hoverColor],
        backgroundColor: theme.colors[bgHoverColor],
      },
      "&:disabled": {
        opacity: ".5",
      },
      "&:visited": {
        color: theme.colors[hoverColor],
      },
      "&:active": {
        color: theme.colors[hoverColor],
      },
    },
  })
);

export default DropdownItem;
