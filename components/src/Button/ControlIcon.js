import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Icon } from "../Icon";
import theme from "../theme";

const getIconColorByState = ({ toggled, disabled }) => {
  if (toggled) {
    return theme.colors.blue;
  }
  if (disabled) {
    return theme.colors.grey;
  }
  return theme.colors.black;
};

const StyledButton = styled.button({
  background: "transparent",
  border: "none",
  display: "flex",
  alignItems: "center",
  padding: 0,
  borderRadius: theme.radii.circle,
  color: theme.colors.blue,
  "&:focus": {
    outline: "none",
    boxShadow: theme.shadows.focus
  }
});

const ControlIcon = React.forwardRef(({ icon, toggled, disabled, label, ...props }, ref) => (
  <StyledButton aria-label={label} ref={ref} disabled={disabled} {...props}>
    <Icon size={theme.space.x4} icon={icon} color={getIconColorByState({ toggled, disabled })} p="half" />
  </StyledButton>
));

ControlIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  toggled: PropTypes.bool,
  disabled: PropTypes.bool
};

ControlIcon.defaultProps = {
  onClick: null,
  toggled: false,
  disabled: false
};
export default ControlIcon;
