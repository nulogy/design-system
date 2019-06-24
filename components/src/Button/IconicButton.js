import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
import { Icon } from "../Icon";
import { Text } from "../Type";
import theme from "../theme";
import icons from "../../icons/icons.json";
import { Manager, Reference, Popper } from "react-popper";

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
  "&:hover": {
    [`${Icon}`]: {
      backgroundColor: theme.colors.lightBlue
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
    }
  }
}));

const HoverText = styled.div({});

const BaseIconicButton = React.forwardRef(({ children, icon, hoverLabel, ...props }, ref) => (
  <div style={{ display: "inline" }}>
    <Manager>
      <Reference>
        {({ ref: popperRef }) => (
          <WrapperButton ref={ref} label={children} {...props}>
            <Icon ref={popperRef} size={theme.space.x4} icon={icon} p="half" />
            {children && !hoverLabel && (
              <Text mr="half" ml="half">
                {children}
              </Text>
            )}
          </WrapperButton>
        )}
      </Reference>
      <Popper placement="bottom">
        {({ ref, style, placement }) =>
          hoverLabel ? (
            <HoverText ref={ref} style={style} placement={placement}>
              hey
            </HoverText>
          ) : null
        }
      </Popper>
    </Manager>
  </div>
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
