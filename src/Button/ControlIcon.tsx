import React from "react";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { Icon } from "../Icon";

type ControlIconProps = React.ComponentPropsWithRef<"button"> &
  SpaceProps & {
    onClick?: (...args: any[]) => any;
    icon: string;
    toggled?: boolean;
    disabled?: boolean;
    size?: string;
    type?: string;
    label?: string;
  };

const getIconColorByState = ({ toggled, disabled, theme }) => {
  if (toggled) {
    return theme.colors.darkBlue;
  }
  if (disabled) {
    return theme.colors.grey;
  }
  return theme.colors.darkGrey;
};

const StyledButton: React.FC<any> = styled.button(
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
      boxShadow: theme.shadows.focus,
    },
    "&:hover:enabled": {
      cursor: "pointer",
      color: theme.colors.blackBlue,
      backgroundColor: theme.colors.lightGrey,
    },
  }),
  space
);

const ControlIcon = React.forwardRef(
  ({ icon, toggled, disabled, label, size = "x4", type = "button", ...props }: ControlIconProps, ref) => (
    <StyledButton aria-label={label} ref={ref} disabled={disabled} toggled={toggled} type={type} {...props}>
      <Icon size={size} icon={icon} />
    </StyledButton>
  )
);
export default ControlIcon;
