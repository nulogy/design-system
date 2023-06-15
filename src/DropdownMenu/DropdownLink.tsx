import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";
import { addStyledProps, StyledProps } from "../StyledProps";
import { DefaultNDSThemeType } from "../theme.type";
import { ComponentSize } from "../NDSProvider/ComponentSizeContext";

type DropdownLinkProps = React.ComponentPropsWithRef<"a"> &
  StyledProps & {
    disabled?: boolean;
    size?: ComponentSize;
    color?: string;
    theme?: DefaultNDSThemeType;
    hoverColor?: string;
    bgHoverColor?: string;
  };

const DropdownLink = styled.a.withConfig<DropdownLinkProps>({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["hoverColor", "bgHoverColor"].includes(prop) && defaultValidatorFn(prop),
})(
  ({ theme, color, bgHoverColor, hoverColor }) => ({
    color: theme.colors[color],
    fontWeight: theme.fontWeights.medium,
    display: "flex",
    alignItems: "center",
    gap: theme.space.half,
    textDecoration: "none",
    borderColor: "transparent",
    backgroundColor: "transparent",
    lineHeight: theme.lineHeights.base,
    fontSize: theme.fontSizes.medium,
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
      borderLeft: `${theme.space.half}  solid ${theme.colors.blue}`,
    },
    "&:disabled": {
      opacity: ".5",
    },
  }),
  variant({
    prop: "size",
    variants: {
      large: {
        pt: "x2",
        pr: "x2",
        pb: "x2",
        pl: "12px",
      },

      medium: {
        pt: "x1",
        pr: "x2",
        pb: "x1",
        pl: "12px",
      },
    },
  }),
  addStyledProps
);

DropdownLink.defaultProps = {
  disabled: false,
  color: "darkGrey",
  hoverColor: "darkBlue",
  bgHoverColor: "lightBlue",
};
export default DropdownLink;
