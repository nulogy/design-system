import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import { Icon } from "../Icon";
import NDSTheme from "../theme";
const getIconColorByState = ({ toggled, disabled, theme }) => {
  if (toggled) {
    return theme.colors.darkBlue;
  }
  if (disabled) {
    return theme.colors.grey;
  }
  return theme.colors.darkGrey;
};
const StyledButton: React.SFC<any> = styled.button(
  ({ toggled, disabled, theme }: any) => ({
    background: "transparent",
    border: "none",
    display: "flex",
    alignItems: "center",
    padding: theme.space.half,
    borderRadius: theme.radii.circle,
    color: getIconColorByState({ toggled, disabled, theme }),
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
type ControlIconProps = {
  icon: string;
  label: string;
  onClick?: (...args: any[]) => any;
  toggled?: boolean;
  disabled?: boolean;
  size?: string;
  type?: string;
};
const ControlIcon = React.forwardRef(
  ({ icon, toggled, disabled, label, size, type, ...props }: ControlIconProps, ref) => (
    <StyledButton aria-label={label} ref={ref} disabled={disabled} toggled={toggled} type={type} {...props}>
      <Icon size={size} icon={icon} />
    </StyledButton>
  )
);
ControlIcon.defaultProps = {
  onClick: () => {},
  toggled: false,
  disabled: false,
  size: NDSTheme.space.x4,
  type: "button"
};
export default ControlIcon;
