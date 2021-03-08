import React from "react";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { Manager, Reference, Popper } from "react-popper-latest";
import { transparentize } from "polished";
import icons from "@nulogy/icons";
import { Icon } from "../Icon";
import { Text } from "../Type";
import NDSTheme from "../theme";

const HoverText: React.SFC<any> = styled.div(({ theme }) => ({
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
const WrapperButton: React.SFC<any> = styled.button(
  ({ disabled, theme }: any) => ({
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
        backgroundColor: theme.colors.lightBlue,
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
type IconicButtonProps = SpaceProps & {
  className?: string;
  color?: string;
  labelHidden?: boolean;
  disabled?: boolean;
  onClick?: (...args: any[]) => any;
  icon?: any;
  iconSize?: string;
  children?: any;
};
const IconicButton = React.forwardRef<HTMLButtonElement, IconicButtonProps>(
  (
    {
      children,
      color = "darkBlue",
      icon,
      labelHidden,
      className,
      iconSize,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <WrapperButton
        ref={forwardedRef}
        aria-label={children}
        className={className}
        {...props}
      >
        <Manager>
          <Reference>
            {({ ref }) => (
              <Icon
                ref={ref}
                size={iconSize || NDSTheme.space.x4}
                icon={icon}
                p="half"
                color={color}
              />
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
              labelHidden ? (
                <HoverText ref={ref} style={style} placement={placement}>
                  {children}
                </HoverText>
              ) : null
            }
          </Popper>
        </Manager>
        {children && !labelHidden && (
          <Text mr="half" ml="half" color={color}>
            {children}
          </Text>
        )}
      </WrapperButton>
    );
  }
);
export const iconNames = Object.keys(icons);

export default IconicButton;
