import styled from "styled-components";

const DropdownLink: React.FC<any> = styled.a.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["hoverColor", "bgHoverColor"].includes(prop) && defaultValidatorFn(prop),
})(
  ({
    theme,
    bgHoverColor = "lightGrey",
    hoverColor = "darkBlue",
    color = "darkBlue",
  }: any) => ({
    display: "block",
    textDecoration: "none",
    borderColor: "transparent",
    backgroundColor: "transparent",
    lineHeight: theme.lineHeights.base,
    fontSize: theme.fontSizes.medium,
    transition: ".2s",
    color: theme.colors[color],
    padding: `${theme.space.x1} ${theme.space.x2} ${theme.space.x1} 12px`,
    borderLeft: `${theme.space.half} solid transparent`,
    "&:hover": {
      color: theme.colors[hoverColor],
      backgroundColor: theme.colors[bgHoverColor],
    },
    "&:visited": {
      color: theme.colors[color],
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
  })
);

export default DropdownLink;
