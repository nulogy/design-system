import React from "react";
import styled, { useTheme } from "styled-components";
import { space, SpaceProps, variant } from "styled-system";
import { Icon } from "../Icon";
import { DefaultNDSThemeType } from "../theme.type";
import { useComponentSize, ComponentSize as ContextComponentSize } from "../NDSProvider/ComponentSizeContext";

type ComponentSize = "small" | "medium" | "large";

export type ButtonProps = SpaceProps &
  React.ComponentPropsWithRef<"button"> & {
    className?: string;
    icon?: any;
    iconSide?: "left" | "right";
    size?: ComponentSize;
    fullWidth?: boolean;
    asLink?: boolean;
    children?: React.ReactNode;
    theme?: DefaultNDSThemeType;
    href?: string;
  };

const WrapperButton = styled.button<ButtonProps>(
  ({ fullWidth }) => ({
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
    fontSize: "medium",
    paddingTop: theme.space.x1,
    paddingBottom: theme.space.x1,
    paddingLeft: theme.space.x2,
    paddingRight: theme.space.x2,
  }),
  variant({
    prop: "size",
    variants: {
      small: {
        fontSize: "small",
        lineHeight: "smallTextCompressed",
        py: "half",
        px: "x1",
      },

      large: {
        fontSize: "medium",
        py: "x2",
        px: "x3",
      },

      medium: {
        fontSize: "medium",
        py: "x1",
        px: "x2",
      },
    },
  }),
  space
);

const Button: React.FC<ButtonProps> = React.forwardRef(
  ({ children, iconSide = "right", icon, className, asLink, size, ...props }: ButtonProps, ref) => {
    const {
      lineHeights: { smallTextCompressed },
    } = useTheme();

    const componentSize = useComponentSize(size as ContextComponentSize);

    return (
      <WrapperButton as={asLink ? "a" : "button"} ref={ref} className={className} size={componentSize} {...props}>
        {icon && iconSide === "left" && <Icon size={`${smallTextCompressed}em`} mr="half" icon={icon} />}
        {children}
        {icon && iconSide === "right" && <Icon size={`${smallTextCompressed}em`} ml="half" icon={icon} />}
      </WrapperButton>
    );
  }
);

export default Button;
