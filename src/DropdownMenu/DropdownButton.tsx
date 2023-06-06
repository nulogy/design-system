import React from "react";
import styled, { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
import { addStyledProps, StyledProps } from "../StyledProps";
import { ComponentSize } from "../Input/InputField";

type DropdownButtonProps = React.ComponentPropsWithRef<"button"> &
  StyledProps & {
    size?: ComponentSize;
    color?: string;
    theme?: DefaultNDSThemeType;
    hoverColor?: string;
    bgHoverColor?: string;
  };

export const getSize = (size: ComponentSize, theme: DefaultNDSThemeType): CSSObject => {
  switch (size) {
    case "large":
      return {
        padding: `${theme.space.x2} ${theme.space.x2} ${theme.space.x2} 12px`,
      };

    case "medium":
    default:
      return {
        padding: `${theme.space.x1} ${theme.space.x2} ${theme.space.x1} 12px`,
      };
  }
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
  ({ size, theme }) => getSize(size, theme),
  addStyledProps
);

DropdownButton.defaultProps = {
  disabled: false,
  hoverColor: "darkBlue",
  bgHoverColor: "lightBlue",
};

export default DropdownButton;
