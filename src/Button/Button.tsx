import React from "react";
import styled, { useTheme } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { Icon } from "../Icon";
import { subPx } from "../utils";
import { DefaultNDSThemeType } from "../theme.type";

type SizeType = "small" | "medium" | "large" | undefined;

export type ButtonProps = SpaceProps &
  React.ComponentPropsWithRef<"button"> & {
    className?: string;
    icon?: any;
    iconSide?: "left" | "right";
    size?: SizeType;
    fullWidth?: boolean;
    asLink?: boolean;
    children?: React.ReactNode;
    theme?: DefaultNDSThemeType;
    href?: string;
  };

const getSize = (size: SizeType, theme: DefaultNDSThemeType) => {
  switch (size) {
    case "small":
      return {
        fontSize: `${theme.fontSizes.small}`,
        lineHeight: `${theme.lineHeights.smallTextCompressed}`,
        padding: `${subPx(theme.space.half)} ${theme.space.x1}`,
      };
    case "medium":
      return {
        fontSize: `${theme.fontSizes.medium}`,
        padding: `${subPx(theme.space.x1)} ${theme.space.x2}`,
      };
    case "large":
      return {
        fontSize: `${theme.fontSizes.large}`,
        lineHeight: `${theme.lineHeights.subsectionTitle}`,
        padding: `${subPx(theme.space.x2)} ${theme.space.x3}`,
      };
    default:
      return {
        fontSize: `${theme.fontSizes.medium}`,
        padding: `${subPx(theme.space.x1)} ${theme.space.x2}`,
      };
  }
};
const WrapperButton = styled.button<any>(
  ({ fullWidth }: any) => ({
    width: fullWidth ? "100%" : "auto",
  }),
  ({ disabled, theme }) => ({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: theme.fontWeights.medium,
    textDecoration: "none",
    verticalAlign: "middle",
    lineHeight: theme.lineHeights.base,
    cursor: disabled ? "default" : "pointer",
    color: theme.colors.blue,
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.blue}`,
    borderRadius: theme.radii.medium,
    margin: theme.space.none,
    transition: "background-color .2s, transform .2s ease-in",
    "&:hover": {
      backgroundColor: disabled ? null : theme.colors.lightBlue,
    },
    "&:focus": {
      outline: "none",
      borderColor: theme.colors.blue,
      boxShadow: theme.shadows.focus,
      backgroundColor: theme.colors.white,
      "&:hover": {
        backgroundColor: theme.colors.lightBlue,
      },
    },
    "&:active": {
      transform: "scale(0.98)",
    },
    "&:disabled": {
      opacity: ".5",
    },
  }),
  ({ size, theme }: any) => ({
    ...getSize(size, theme),
  }),
  space
);

const Button: React.FC<ButtonProps> = React.forwardRef(
  ({ children, iconSide = "right", icon, className, asLink, size = "medium", ...props }: ButtonProps, ref) => {
    const {
      lineHeights: { smallTextCompressed },
    } = useTheme();
    return (
      <WrapperButton as={asLink ? "a" : undefined} ref={ref} className={className} size={size} {...props}>
        {icon && iconSide === "left" && <Icon size={`${smallTextCompressed}em`} mr="half" icon={icon} />}
        {children}
        {icon && iconSide === "right" && <Icon size={`${smallTextCompressed}em`} ml="half" icon={icon} />}
      </WrapperButton>
    );
  }
);

export default Button;
