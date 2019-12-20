import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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

const StyledButton = styled.button(({ toggled, disabled }) => ({
  background: "transparent",
  border: "none",
  display: "flex",
  alignItems: "center",
  padding: 0,
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
}));

const ControlIcon = React.forwardRef(({ icon, toggled, disabled, label, size, ...props }, ref) => (
  <StyledButton aria-label={label} ref={ref} disabled={disabled} toggled={toggled} {...props}>
    <Icon size={size} icon={icon} />
  </StyledButton>
));

ControlIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  toggled: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string
};

ControlIcon.defaultProps = {
  onClick: null,
  toggled: false,
  disabled: false,
  size: theme.space.x4
};
export default ControlIcon;
