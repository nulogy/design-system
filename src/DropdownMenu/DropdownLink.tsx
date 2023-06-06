import React from "react";
import styled from "styled-components";
import { addStyledProps, StyledProps } from "../StyledProps";
import { ComponentSize } from "../Input/InputField";
import { DefaultNDSThemeType } from "../theme.type";
import { getSize } from "./DropdownButton";

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
  ({ theme, color, bgHoverColor, hoverColor }: any) => ({
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
  ({ size, theme }) => getSize(size, theme),
  addStyledProps
);

DropdownLink.defaultProps = {
  disabled: false,
  color: "darkGrey",
  hoverColor: "darkBlue",
  bgHoverColor: "lightBlue",
};
export default DropdownLink;
