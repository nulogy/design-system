import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";
import { addStyledProps, StyledProps } from "../StyledProps";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";

interface Props extends React.ComponentPropsWithRef<"a">, StyledProps {
  disabled?: boolean;
  variant?: ComponentVariant;
  color?: string;
  hoverColor?: string;
  bgHoverColor?: string;
}

const DropdownLink = styled.a.withConfig<Props>({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["hoverColor", "bgHoverColor"].includes(prop) && defaultValidatorFn(prop),
})(
  ({ theme, color = "darkGrey", hoverColor = "darkBlue", bgHoverColor = "lightBlue" }) => ({
    color: theme.colors[color],
    fontWeight: theme.fontWeights.medium,
    display: "flex",
    alignItems: "center",
    gap: theme.space.half,
    textDecoration: "none",
    borderColor: "transparent",
    backgroundColor: "transparent",
    lineHeight: theme.lineHeights.base,
    fontSize: theme.fontSizes.base,
    transition: ".2s",
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
      borderLeft: `${theme.space.half} solid ${theme.colors.blue}`,
    },
    "&:disabled": {
      opacity: ".5",
    },
    paddingTop: theme.space.x1,
    paddingRight: theme.space.x2,
    paddingBottom: theme.space.x1,
    paddingLeft: `calc(${theme.space.x2} - ${theme.space.half})`,
  }),
  variant({
    variants: {
      touch: {
        fontSize: "md",
        lineHeight: "base",
      },
    },
  }),
  addStyledProps
);

export default DropdownLink;
