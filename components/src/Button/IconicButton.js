import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
import { Icon } from "../Icon";
import { Text } from "../Type";
import theme from "../theme";
import icons from "../../icons/icons.json";
import { Manager, Reference, Popper } from "react-popper";
import { transparentize } from "polished";

const WrapperButton = styled.button(space, ({ disabled }) => ({
  background: "transparent",
  border: "none",
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  padding: `${theme.space.half} ${theme.space.none}`,
  color: theme.colors.darkBlue,
  cursor: disabled ? "arrow" : "pointer",

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
}));

const HoverText = styled.div({
  whiteSpace: "nowrap",
  fontSize: theme.fontSizes.small,
  lineHeight: theme.lineHeights.smallTextCompressed,
  color: theme.colors.whiteGrey,
  backgroundColor: transparentize(0.15, theme.colors.blackBlue),
  borderRadius: theme.radii.medium,
  marginTop: theme.space.half,
  padding: `${theme.space.half} ${theme.space.x1}`,
  pointerEvents: "none"
});

const BaseIconicButton = React.forwardRef(({ children, icon, hoverLabel, ...props }, ref) => (
  <WrapperButton ref={ref} label={children} {...props}>
    <Manager>
      <Reference>
        {({ ref: popperRef }) => <Icon ref={popperRef} size={theme.space.x4} icon={icon} p="half" />}
      </Reference>
      <Popper placement="bottom">
        {({ ref, style, placement }) =>
          hoverLabel ? (
            <HoverText ref={ref} style={style} placement={placement}>
              {children}
            </HoverText>
          ) : null
        }
      </Popper>
    </Manager>
    {children && !hoverLabel && (
      <Text mr="half" ml="half">
        {children}
      </Text>
    )}
  </WrapperButton>
));

const IconicButton = styled(BaseIconicButton)({});

export const iconNames = Object.keys(icons);

BaseIconicButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOf(iconNames).isRequired
};

BaseIconicButton.defaultProps = {
  disabled: false,
  children: null
};

export default IconicButton;
