import React from "react";
import styled from "styled-components";
import { space, SpaceProps, variant } from "styled-system";
import { Manager, Reference, Popper } from "react-popper-2";
import { transparentize } from "polished";
import icons from "@nulogy/icons";
import { Icon } from "../Icon";
import { Text } from "../Type";
import { DefaultNDSThemeType } from "../theme";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";

interface BaseProps {
  variant?: ComponentVariant;
  color?: string;
  labelHidden?: boolean;
  icon?: string;
  iconSize?: string;
  hoverBackgroundColor?: string;
  fontSize?: string;
  tooltip?: React.ReactNode;
}

interface IconicButtonProps
  extends BaseProps,
    SpaceProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {}

const IconWrapper = styled.span(({ theme, size }: { theme: DefaultNDSThemeType; size: string }) => ({
  display: "inline-flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.radii.circle,
  height: `calc(${theme.sizes[size] ?? size} + ${theme.sizes.x1})`,
  width: `calc(${theme.sizes[size] ?? size} + ${theme.sizes.x1})`,
  transition: ".2s",
}));

const HoverText = styled.div(({ theme }) => ({
  whiteSpace: "nowrap",
  ontSize: theme.fontSizes.small,
  lineHeight: theme.lineHeights.smallTextCompressed,
  color: theme.colors.whiteGrey,
  backgroundColor: transparentize(0.15, theme.colors.blackBlue),
  borderRadius: theme.radii.medium,
  marginTop: theme.space.half,
  padding: `${theme.space.half} ${theme.space.x1}`,
  pointerEvents: "none",
}));

const WrapperButton = styled.button<IconicButtonProps>(
  ({ disabled, hoverBackgroundColor, theme }) => ({
    background: "transparent",
    border: "none",
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    cursor: disabled ? "default" : "pointer",

    [`${Text}`]: {
      display: "block",
      fontWeight: theme.fontWeights.medium,
      textAlign: "left",
    },
    [`${HoverText}`]: {
      opacity: "0",
    },
    "&:hover": {
      [`${IconWrapper}`]: {
        backgroundColor: theme.colors[hoverBackgroundColor] ?? hoverBackgroundColor,
      },
      [`${HoverText}`]: {
        opacity: "1",
      },
    },
    "&:active": {
      [`${IconWrapper}`]: {
        transform: "scale(0.875)",
        transition: ".2s ease-in",
      },
    },
    "&:disabled": {
      opacity: ".5",
      "&:hover, &:active": {
        [`${IconWrapper}`]: {
          background: "none",
          transform: "none",
        },
      },
    },
    "&:focus": {
      outline: "none",
      [`${IconWrapper}`]: {
        boxShadow: theme.shadows.focus,
      },
      [`${HoverText}`]: {
        opacity: "1",
      },
    },
    paddingTop: theme.space.half,
    paddingBottom: theme.space.half,
    paddingLeft: theme.space.none,
    paddingRight: theme.space.none,
  }),
  variant({
    variants: {
      touch: {
        fontSize: "md",
        lineHeight: "base",
      },
    },
  }),
  space
);

const IconicButton = React.forwardRef<HTMLButtonElement, IconicButtonProps>(
  (
    {
      children,
      color = "darkBlue",
      hoverBackgroundColor = "lightBlue",
      icon,
      labelHidden,
      className,
      iconSize = "x3",
      fontSize,
      tooltip,
      variant,
      ...props
    },
    forwardedRef
  ) => {
    const componentVariant = useComponentVariant(variant);

    return (
      <WrapperButton
        ref={forwardedRef}
        aria-label={props["aria-label"] ? props["aria-label"] : typeof children === "string" ? children : undefined}
        className={className}
        hoverBackgroundColor={hoverBackgroundColor}
        variant={componentVariant}
        {...props}
      >
        <Manager>
          <Reference>
            {({ ref }) => (
              <IconWrapper ref={ref} size={iconSize}>
                <Icon size={iconSize} icon={icon} color={color} />
              </IconWrapper>
            )}
          </Reference>
          <Popper
            placement="bottom"
            modifiers={[
              {
                name: "preventOverflow",
                enabled: true,
                options: {
                  padding: 8,
                  rootBoundary: "viewport",
                },
              },
            ]}
          >
            {({ ref, style }) =>
              labelHidden || tooltip ? (
                <HoverText ref={ref} style={style}>
                  {tooltip ? tooltip : children}
                </HoverText>
              ) : null
            }
          </Popper>
        </Manager>
        {children &&
          !labelHidden &&
          (typeof children === "string" || typeof children === "number" ? (
            <Text fontSize={fontSize} mr="half" ml="half" color={color}>
              {children}
            </Text>
          ) : (
            children
          ))}
      </WrapperButton>
    );
  }
);

export const iconNames = Object.keys(icons);

export default IconicButton;
