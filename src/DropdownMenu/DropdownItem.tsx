import styled, { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";

type DropdownItemProps = {
  theme?: DefaultNDSThemeType;
  color?: string;
  hoverColor?: string;
  bgHoverColor?: string;
};

const DropdownItem: React.FC<DropdownItemProps> = styled.div(
  ({
    theme,
    color,
    hoverColor,
    bgHoverColor,
  }: DropdownItemProps): CSSObject => ({
    "*": {
      color: theme.colors[color],
      fontWeight: theme.fontWeights.medium,
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
DropdownItem.defaultProps = {
  color: "darkGrey",
  hoverColor: "darkBlue",
  bgHoverColor: "lightBlue",
};
export default DropdownItem;
