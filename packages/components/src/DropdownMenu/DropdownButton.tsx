import styled from "styled-components";
import { color } from "styled-system";
import { ThemeType } from "../theme.type";
type DropdownButtonProps = {
  color?: string;
  disabled?: boolean;
  theme?: ThemeType;
  hoverColor?: string;
  bgHoverColor?: string;
};
const DropdownButton: React.SFC<DropdownButtonProps> = styled.button(
  color,
  ({ disabled = false, theme, hoverColor = "darkBlue", bgHoverColor = "lightGrey" }: DropdownButtonProps) => ({
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
      backgroundColor: disabled ? "transparent" : theme.colors[bgHoverColor]
    },
    "&:focus": {
      outline: "none",
      color: theme.colors[hoverColor],
      backgroundColor: theme.colors[bgHoverColor],
      borderLeft: `${theme.space.half}  solid ${theme.colors.blue}`
    },
    "&:disabled": {
      opacity: ".5"
    }
  })
);
DropdownButton.defaultProps = {
  color: "darkBlue",
  disabled: false,
  hoverColor: "darkBlue",
  bgHoverColor: "lightGrey"
};
export default DropdownButton;
