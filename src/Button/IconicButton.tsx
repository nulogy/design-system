import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { space, SpaceProps, variant } from "styled-system";
import { Manager, Reference, Popper } from "react-popper-2";
import { transparentize } from "polished";
import icons from "@nulogy/icons";
import { Icon } from "../Icon";
import { Text } from "../Type";
import { DefaultNDSThemeType } from "../theme.type";
import { ComponentSize, useComponentSize } from "../NDSProvider/ComponentSizeContext";

type BaseProps = {
  size?: ComponentSize;
  color?: string;
  labelHidden?: boolean;
  icon?: any;
  iconSize?: string;
  hoverBackgroundColor?: string;
  fontSize?: string;
  tooltip?: string;
};

type IconicButtonProps = BaseProps & SpaceProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

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

const HoverText: React.FC<any> = styled.div(({ theme }) => ({
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
  ({ disabled, hoverBackgroundColor, theme }: any) => ({
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
    prop: "size",
    variants: {
      large: {
        py: "x1",
        px: "none",
      },
      medium: {
        py: "half",
        px: "none",
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
      size,
      ...props
    },
    forwardedRef
  ) => {
    const componentSize = useComponentSize(size);

    return (
      <WrapperButton
        ref={forwardedRef}
        aria-label={props["aria-label"] ? props["aria-label"] : typeof children === "string" ? children : undefined}
        className={className}
        hoverBackgroundColor={hoverBackgroundColor}
        size={componentSize}
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
            {({ ref, style, placement }) =>
              labelHidden || tooltip ? (
                <HoverText ref={ref} style={style} placement={placement}>
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

IconicButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.node,
};

export default IconicButton;
