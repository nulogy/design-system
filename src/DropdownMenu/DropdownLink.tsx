import styled from "styled-components";

const DropdownLink: React.FC<any> = styled.a.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["hoverColor", "bgHoverColor"].includes(prop) && defaultValidatorFn(prop),
})(({ theme, color, bgHoverColor, hoverColor }: any) => ({
  color: theme.colors[color],
  fontWeight: theme.fontWeights.medium,
  display: "block",
  textDecoration: "none",
  borderColor: "transparent",
  backgroundColor: "transparent",
  lineHeight: theme.lineHeights.base,
  fontSize: theme.fontSizes.medium,
  transition: ".2s",
  padding: `${theme.space.x1} ${theme.space.x2} ${theme.space.x1} 12px`,
  borderLeft: `${theme.space.half} solid transparent`,
  "&:visited": {
    color: theme.colors[color],
  },
  "&:hover": {
    color: theme.colors[hoverColor],
    backgroundColor: theme.colors[bgHoverColor],
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
}));
DropdownLink.defaultProps = {
  disabled: false,
  color: "darkGrey",
  hoverColor: "darkBlue",
  bgHoverColor: "lightBlue",
};
export default DropdownLink;
