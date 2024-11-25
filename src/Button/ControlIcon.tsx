import type { IconName } from "@nulogy/icons";
import React from "react";
import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import { Icon } from "../Icon";

type ControlIconProps = React.ComponentPropsWithRef<"button"> &
  SpaceProps &
  LayoutProps & {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    icon: IconName | "loading";
    toggled?: boolean;
    disabled?: boolean;
    size?: string;
    type?: string;
    label?: string;
  };

const getIconColorByState = ({ toggled, disabled, theme }) => {
  if (toggled) return theme.colors.darkBlue;

  if (disabled) return theme.colors.grey;

  return theme.colors.darkGrey;
};

const StyledButton = styled.button<{
  toggled?: ControlIconProps["toggled"];
  disabled?: ControlIconProps["disabled"];
}>(
  ({ toggled, disabled, theme }) => ({
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
  space,
  layout
);

const ControlIcon = React.forwardRef<HTMLButtonElement, ControlIconProps>(
  ({ icon, toggled, disabled, label, size = "x4", type = "button", ...props }, ref) => (
    <StyledButton aria-label={label} ref={ref} disabled={disabled} toggled={toggled} type={type} {...props}>
      <Icon size={size} icon={icon} />
    </StyledButton>
  )
);
export default ControlIcon;
