import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import { Manager, Reference, Popper } from "react-popper";
import { transparentize } from "polished";
import icons from "@nulogy/icons";

import { Icon } from "../Icon";
import { Text } from "../Type";
import NDSTheme from "../theme";

const HoverText = styled.div(({ theme }) => ({
  whiteSpace: "nowrap",
  ontSize: theme.fontSizes.small,
  lineHeight: theme.lineHeights.smallTextCompressed,
  color: theme.colors.whiteGrey,
  backgroundColor: transparentize(0.15, theme.colors.blackBlue),
  borderRadius: theme.radii.medium,
  marginTop: theme.space.half,
  padding: `${theme.space.half} ${theme.space.x1}`,
  pointerEvents: "none"
}));

const WrapperButton = styled.button(
  ({ disabled, theme }) => ({
    background: "transparent",
    border: "none",
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    padding: `${theme.space.half} ${theme.space.none}`,
    color: theme.colors.darkBlue,
    cursor: disabled ? "default" : "pointer",

    [`${Icon}`]: {
      borderRadius: theme.radii.circle,
      transition: ".2s"
    },
    [`${Text}`]: {
      display: "block",
      fontWeight: theme.fontWeights.medium,
      textAlign: "left"
    },
    [`${HoverText}`]: {
      opacity: "0"
    },
    "&:hover": {
      [`${Icon}`]: {
        backgroundColor: theme.colors.lightBlue
      },
      [`${HoverText}`]: {
        opacity: "1"
      }
    },
    "&:active": {
      [`${Icon}`]: {
        transform: "scale(0.875)",
        transition: ".2s ease-in"
      }
    },
    "&:disabled": {
      opacity: ".5",
      "&:hover, &:active": {
        [`${Icon}`]: {
          background: "none",
          transform: "none"
        }
      }
    },
    "&:focus": {
      outline: "none",
      [`${Icon}`]: {
        boxShadow: theme.shadows.focus
      },
      [`${HoverText}`]: {
        opacity: "1"
      }
    }
  }),
  space
);

const BaseIconicButton = React.forwardRef(({ children, icon, labelHidden, className, ...props }, forwardedRef) => {
  return (
    <WrapperButton ref={forwardedRef} aria-label={children} className={className} {...props}>
      <Manager>
        <Reference>{({ ref }) => <Icon ref={ref} size={NDSTheme.space.x4} icon={icon} p="half" />}</Reference>
        <Popper
          placement="bottom"
          modifiers={{
            preventOverflow: { enabled: true, padding: 8, boundariesElement: "viewport" }
          }}
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
        <Text mr="half" ml="half">
          {children}
        </Text>
      )}
    </WrapperButton>
  );
});

const IconicButton = styled(BaseIconicButton)({});

export const iconNames = Object.keys(icons);

BaseIconicButton.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  labelHidden: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOf(iconNames).isRequired,
  ...propTypes.space
};

BaseIconicButton.defaultProps = {
  children: null,
  className: undefined,
  labelHidden: false,
  disabled: false
};

export default IconicButton;
