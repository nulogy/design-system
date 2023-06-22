import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";
import { DefaultNDSThemeType } from "../theme.type";
import { addStyledProps, StyledProps } from "../StyledProps";
import { ComponentSize } from "../NDSProvider/ComponentSizeContext";

type DropdownButtonProps = React.ComponentPropsWithRef<"button"> &
  StyledProps & {
    size?: ComponentSize;
    color?: string;
    theme?: DefaultNDSThemeType;
    hoverColor?: string;
    bgHoverColor?: string;
  };

const DropdownButton = styled.button<DropdownButtonProps>(
  ({ disabled, theme, hoverColor, bgHoverColor }) => ({
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
    borderLeft: `${theme.space.half} solid transparent`,
    paddingTop: theme.space.x1,
    paddingRight: theme.space.x2,
    paddingBottom: theme.space.x1,
    paddingLeft: "12px",
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

DropdownButton.defaultProps = {
  disabled: false,
  hoverColor: "darkBlue",
  bgHoverColor: "lightBlue",
};

export default DropdownButton;
