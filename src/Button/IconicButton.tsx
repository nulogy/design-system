import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { space, SpaceProps } from "styled-system";
import { Manager, Reference, Popper } from "react-popper-2";
import { transparentize } from "polished";
import icons from "@nulogy/icons";
import { Icon } from "../Icon";
import { Text } from "../Type";

type BaseProps = {
  color?: string;
  labelHidden?: boolean;
  icon?: any;
  iconSize?: string;
  hoverBackgroundColor?: string;
  fontSize?: string;
  tooltip?: string;
};

type IconicButtonProps = BaseProps & SpaceProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

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

const WrapperButton: React.FC<any> = styled.button(
  ({ disabled, hoverBackgroundColor, theme }: any) => ({
    background: "transparent",
    border: "none",
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    padding: `${theme.space.half} ${theme.space.none}`,
    cursor: disabled ? "default" : "pointer",
    [`${Icon}`]: {
      borderRadius: theme.radii.circle,
      transition: ".2s",
    },
    [`${Text}`]: {
      display: "block",
      fontWeight: theme.fontWeights.medium,
      textAlign: "left",
    },
    [`${HoverText}`]: {
      opacity: "0",
    },
    "&:hover": {
      [`${Icon}`]: {
        backgroundColor: theme.colors[hoverBackgroundColor] ?? hoverBackgroundColor,
      },
      [`${HoverText}`]: {
        opacity: "1",
      },
    },
    "&:active": {
      [`${Icon}`]: {
        transform: "scale(0.875)",
        transition: ".2s ease-in",
      },
    },
    "&:disabled": {
      opacity: ".5",
      "&:hover, &:active": {
        [`${Icon}`]: {
          background: "none",
          transform: "none",
        },
      },
    },
    "&:focus": {
      outline: "none",
      [`${Icon}`]: {
        boxShadow: theme.shadows.focus,
      },
      [`${HoverText}`]: {
        opacity: "1",
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
      iconSize,
      fontSize,
      tooltip,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <WrapperButton
        ref={forwardedRef}
        aria-label={props["aria-label"] ? props["aria-label"] : typeof children === "string" ? children : undefined}
        className={className}
        hoverBackgroundColor={hoverBackgroundColor}
        {...props}
      >
        <Manager>
          <Reference>
            {({ ref }) => <Icon ref={ref} size={iconSize || "x4"} icon={icon} p="half" color={color} />}
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
        {children && !labelHidden && (
          <Text fontSize={fontSize} mr="half" ml="half" color={color}>
            {children}
          </Text>
        )}
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
