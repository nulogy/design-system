import styled from "styled-components";

type Props = {
  color?: string;
  hoverColor?: string;
  bgHoverColor?: string;
};

const DropdownItem = styled.div<Props>(
  ({ theme, color = "darkGrey", hoverColor = "darkBlue", bgHoverColor = "lightBlue" }) => ({
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

export default DropdownItem;
