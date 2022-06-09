import styled from "styled-components";
import { color } from "styled-system";
import { DefaultNDSThemeType } from "../theme.type";

type DropdownButtonProps = React.ComponentPropsWithRef<"button"> & {
  color?: string;
  disabled?: boolean;
  theme?: DefaultNDSThemeType;
  hoverColor?: string;
  bgHoverColor?: string;
};

const DropdownButton: React.FC<DropdownButtonProps> = styled.button(
  ({ disabled, theme, hoverColor, bgHoverColor }: DropdownButtonProps) => ({
    color: theme.colors.darkGrey,
    fontWeight: theme.fontWeights.medium,
    display: "block",
    width: "100%",
    cursor: disabled ? "default" : "pointer",
    border: "none",
    textAlign: "left",
    backgroundColor: "transparent",
    lineHeight: theme.lineHeights.base,
    fontSize: theme.fontSizes.medium,
    transition: ".2s",
    padding: `${theme.space.x1} ${theme.space.x2} ${theme.space.x1} 12px`,
    borderLeft: `${theme.space.half} solid transparent`,
    "&:hover": {
      color: theme.colors[hoverColor],
      backgroundColor: disabled ? "transparent" : theme.colors[bgHoverColor],
    },
    "&:focus": {
      outline: "none",
      color: theme.colors[hoverColor],
      backgroundColor: theme.colors[bgHoverColor],
      borderLeft: `${theme.space.half}  solid ${theme.colors.blue}`,
    },
    "&:disabled": {
      opacity: ".5",
    },
  }),
  color
);
DropdownButton.defaultProps = {
  disabled: false,
  hoverColor: "darkBlue",
  bgHoverColor: "lightBlue",
};
export default DropdownButton;
