import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";
import { DefaultNDSThemeType } from "../theme";
import { addStyledProps, StyledProps } from "../StyledProps";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";

type DropdownButtonProps = React.ComponentPropsWithRef<"button"> &
  StyledProps & {
    variant?: ComponentVariant;
    color?: string;
    theme?: DefaultNDSThemeType;
    hoverColor?: string;
    bgHoverColor?: string;
  };

const DropdownButton = styled.button<DropdownButtonProps>(
  ({ disabled = false, hoverColor = "darkBlue", bgHoverColor = "lightBlue", theme }) => ({
    color: theme.colors.darkGrey,
    fontWeight: theme.fontWeights.medium,
    display: "block",
    width: "100%",
    cursor: disabled ? "default" : "pointer",
    border: "none",
    textAlign: "left",
    backgroundColor: "transparent",
    lineHeight: theme.lineHeights.base,
    fontSize: theme.fontSizes.base,
    transition: ".2s",
    borderLeft: `${theme.space.half} solid transparent`,
    paddingTop: theme.space.x1,
    paddingRight: theme.space.x2,
    paddingBottom: theme.space.x1,
    paddingLeft: `calc(${theme.space.x2} - ${theme.space.half})`,
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
    variants: {
      touch: {
        fontSize: "md",
        lineHeight: "base",
      },
    },
  }),
  addStyledProps
);

export default DropdownButton;
