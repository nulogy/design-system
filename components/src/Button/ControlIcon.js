import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import { Icon } from "../Icon";
import theme from "../theme";

const getIconColorByState = ({ toggled, disabled }) => {
  if (toggled) {
    return theme.colors.darkBlue;
  }
  if (disabled) {
    return theme.colors.grey;
  }
  return theme.colors.darkGrey;
};

const StyledButton = styled.button(
  ({ toggled, disabled }) => ({
    background: "transparent",
    border: "none",
    display: "flex",
    alignItems: "center",
    padding: theme.space.half,
    borderRadius: theme.radii.circle,
    color: getIconColorByState({ toggled, disabled }),
    "&:focus": {
      outline: "none",
      boxShadow: theme.shadows.focus
    },
    "&:hover:enabled": {
      cursor: "pointer",
      color: theme.colors.blackBlue,
      backgroundColor: theme.colors.lightGrey
    }
  }),
  space
);

const ControlIcon = React.forwardRef(({ icon, toggled, disabled, label, size, type, ...props }, ref) => (
  <StyledButton aria-label={label} ref={ref} disabled={disabled} toggled={toggled} type={type} {...props}>
    <Icon size={size} icon={icon} />
  </StyledButton>
));

ControlIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  toggled: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
  ...propTypes.space
};

ControlIcon.defaultProps = {
  onClick: null,
  toggled: false,
  disabled: false,
  size: theme.space.x4,
  type: "button"
};
export default ControlIcon;
