import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Icon } from "../Icon";
import { DefaultNDSThemeType } from "../theme";

type StyledButtonProps = React.ComponentPropsWithRef<"button"> & {
  color?: string;
  hoverColor?: string;
  hoverBackground?: string;
  theme?: DefaultNDSThemeType;
};

const StyledButton = styled.button<StyledButtonProps>(
  ({ color = "white", hoverColor = "lightBlue", hoverBackground = "black", theme }) => ({
    display: "flex",
    alignItems: "center",
    position: "relative",
    fontWeight: theme.fontWeights.medium,
    color: theme.colors[color] || color,
    border: "none",
    backgroundColor: "transparent",
    textDecoration: "none",
    lineHeight: theme.lineHeights.base,
    transition: "background-color .2s",
    fontSize: `${theme.fontSizes.base}`,
    padding: `${theme.space.x1} 28px ${theme.space.x1} ${theme.space.x2}`,
    borderRadius: theme.radii.medium,
    "&:hover, &:focus": {
      outline: "none",
      color: theme.colors[hoverColor] || hoverColor,
      backgroundColor: theme.colors[hoverBackground] || hoverBackground,
      cursor: "pointer",
    },
    "&:focus": {
      boxShadow: theme.shadows.focus,
    },
    "&:disabled": {
      opacity: ".5",
    },
  })
);

type MenuTriggerButtonProps = React.ComponentPropsWithRef<"button"> & {
  name?: React.ReactNode;
  color?: string;
  hoverColor?: string;
  hoverBackground?: string;
};

const MenuTriggerButton = React.forwardRef<HTMLButtonElement, MenuTriggerButtonProps>(
  ({ name, color, hoverColor, hoverBackground, ...props }: MenuTriggerButtonProps, ref) => (
    <StyledButton color={color} hoverColor={hoverColor} hoverBackground={hoverBackground} ref={ref} {...props}>
      {name}
      <Icon
        style={{
          position: "absolute",
          top: "52%",
          transform: "translateY(-50%)",
          right: "8px",
        }}
        icon="downArrow"
        color={themeGet(`colors.${color}`, color)(color)}
        size="20px"
        p="2px"
      />
    </StyledButton>
  )
);

MenuTriggerButton.displayName = "MenuTriggerButton";

export default MenuTriggerButton;
